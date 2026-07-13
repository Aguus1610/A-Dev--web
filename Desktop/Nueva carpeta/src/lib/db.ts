import Dexie, { type EntityTable } from 'dexie';
import type { FeatureCollection } from 'geojson';

export interface Spot {
  id?: number;
  name: string;
  lat: number;
  lng: number;
  notes: string;
  species: string[];
  access: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface ColorStop {
  depth: number;
  color: string;
}

export interface BathymetryLayer {
  id?: number;
  spotId: number | null;
  name: string;
  geojson: FeatureCollection;
  colorStops: ColorStop[];
  visible: boolean;
  locked: boolean;
  createdAt: number;
}

export interface AppSettings {
  id: number;
  activeSpotId: number | null;
  preferredBasemap: 'streets' | 'satellite';
}

export const DEFAULT_COLOR_STOPS: ColorStop[] = [
  { depth: 2, color: '#e85d04' },
  { depth: 4, color: '#f48c06' },
  { depth: 6, color: '#faa307' },
  { depth: 8, color: '#ffba08' },
  { depth: 10, color: '#80b918' },
  { depth: 12, color: '#55a630' },
  { depth: 14, color: '#2b9348' },
  { depth: 16, color: '#0077b6' },
  { depth: 18, color: '#023e8a' },
  { depth: 20, color: '#03045e' },
];

export const EXAMPLE_BATHYMETRY: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { depth: 4, name: 'Borde' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-58.52, -34.62],
            [-58.5, -34.62],
            [-58.5, -34.605],
            [-58.52, -34.605],
            [-58.52, -34.62],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { depth: 10, name: 'Media' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-58.515, -34.617],
            [-58.505, -34.617],
            [-58.505, -34.608],
            [-58.515, -34.608],
            [-58.515, -34.617],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { depth: 16, name: 'Hoyo' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-58.512, -34.614],
            [-58.508, -34.614],
            [-58.508, -34.61],
            [-58.512, -34.61],
            [-58.512, -34.614],
          ],
        ],
      },
    },
  ],
};

class FishingDB extends Dexie {
  spots!: EntityTable<Spot, 'id'>;
  bathymetryLayers!: EntityTable<BathymetryLayer, 'id'>;
  settings!: EntityTable<AppSettings, 'id'>;

  constructor() {
    super('anzuelandoPesca');
    this.version(1).stores({
      spots: '++id, name, updatedAt',
      bathymetryLayers: '++id, spotId, name',
      settings: 'id',
    });
  }
}

export const db = new FishingDB();

export async function ensureSeedData(): Promise<void> {
  const settings = await db.settings.get(1);
  if (!settings) {
    await db.settings.put({
      id: 1,
      activeSpotId: null,
      preferredBasemap: 'streets',
    });
  }

  const layerCount = await db.bathymetryLayers.count();
  if (layerCount === 0) {
    await db.bathymetryLayers.add({
      spotId: null,
      name: 'Ejemplo laguna (profundidad m)',
      geojson: EXAMPLE_BATHYMETRY,
      colorStops: DEFAULT_COLOR_STOPS,
      visible: true,
      locked: true,
      createdAt: Date.now(),
    });
  }

  const spotCount = await db.spots.count();
  if (spotCount === 0) {
    const now = Date.now();
    const id = await db.spots.add({
      name: 'Laguna ejemplo',
      lat: -34.612,
      lng: -58.51,
      notes: 'Spot de demostración. Tocá el mapa para agregar los tuyos.',
      species: ['Pejerrey', 'Carpa'],
      access: 'Acceso libre por costanera',
      tags: ['laguna', 'ejemplo'],
      createdAt: now,
      updatedAt: now,
    });
    await db.settings.update(1, { activeSpotId: id });
  }
}

export async function getActiveSpot(): Promise<Spot | undefined> {
  const settings = await db.settings.get(1);
  if (!settings?.activeSpotId) {
    return db.spots.orderBy('updatedAt').reverse().first();
  }
  return db.spots.get(settings.activeSpotId);
}
