import { useEffect, useRef, useState } from 'react';
import maplibregl, { type Map as MapLibreMap, type Marker } from 'maplibre-gl';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  DEFAULT_COLOR_STOPS,
  db,
  type BathymetryLayer as BathyLayer,
} from '../../lib/db';
import SpotForm, { type SpotDraft } from '../spots/SpotForm';
import BathymetryLayer from './BathymetryLayer';
import DepthLegend from './DepthLegend';
import type { FeatureCollection } from 'geojson';

const STREETS_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
};

const SAT_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    sat: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: 'Tiles © Esri',
    },
  },
  layers: [{ id: 'sat', type: 'raster', source: 'sat' }],
};

interface Props {
  focusSpotId?: number;
}

export default function SpotMap({ focusSpotId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [styleEpoch, setStyleEpoch] = useState(0);
  const [draftPos, setDraftPos] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [basemap, setBasemap] = useState<'streets' | 'satellite'>('streets');
  const [importError, setImportError] = useState<string | null>(null);

  const spots = useLiveQuery(() => db.spots.toArray(), []) ?? [];
  const layers = useLiveQuery(() => db.bathymetryLayers.toArray(), []) ?? [];
  const activeLayer = layers.find((l) => l.visible) ?? layers[0];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STREETS_STYLE,
      center: [-58.51, -34.612],
      zoom: 13,
      attributionControl: {},
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'bottom-right',
    );
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
      }),
      'bottom-right',
    );

    map.on('load', () => {
      mapRef.current = map;
      setMapReady(true);
    });

    map.on('click', (e) => {
      setDraftPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  const basemapInit = useRef(false);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    if (!basemapInit.current) {
      basemapInit.current = true;
      return;
    }
    const onIdle = () => setStyleEpoch((n) => n + 1);
    map.once('idle', onIdle);
    map.setStyle(basemap === 'streets' ? STREETS_STYLE : SAT_STYLE);
    return () => {
      map.off('idle', onIdle);
    };
  }, [basemap, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    spots.forEach((spot) => {
      const el = document.createElement('a');
      el.href = `/spots/${spot.id}`;
      el.title = spot.name;
      el.style.cssText = `
        display:block;width:28px;height:28px;border-radius:50%;
        background:#f0c75e;border:2px solid #062a3a;
        box-shadow:0 2px 8px rgba(0,0,0,.4);
      `;
      el.addEventListener('click', (ev) => ev.stopPropagation());

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([spot.lng, spot.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 16 }).setHTML(
            `<strong>${escapeHtml(spot.name)}</strong><br/><a href="/spots/${spot.id}">Ver detalle</a>`,
          ),
        )
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [spots, mapReady, styleEpoch]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !focusSpotId) return;
    const spot = spots.find((s) => s.id === focusSpotId);
    if (spot) {
      map.flyTo({ center: [spot.lng, spot.lat], zoom: 14 });
    }
  }, [focusSpotId, spots, mapReady]);

  async function saveSpot(draft: SpotDraft) {
    const now = Date.now();
    const id = await db.spots.add({ ...draft, createdAt: now, updatedAt: now });
    await db.settings.update(1, { activeSpotId: id });
    setDraftPos(null);
  }

  async function toggleLayerVisible() {
    if (!activeLayer?.id) return;
    await db.bathymetryLayers.update(activeLayer.id, {
      visible: !activeLayer.visible,
    });
  }

  async function toggleLayerLocked() {
    if (!activeLayer?.id) return;
    await db.bathymetryLayers.update(activeLayer.id, {
      locked: !activeLayer.locked,
    });
  }

  async function showFirstLayer() {
    const first = layers[0];
    if (first?.id) await db.bathymetryLayers.update(first.id, { visible: true });
  }

  async function importGeoJson(file: File) {
    setImportError(null);
    try {
      const text = await file.text();
      const json = JSON.parse(text) as FeatureCollection;
      if (json.type !== 'FeatureCollection' || !Array.isArray(json.features)) {
        throw new Error('El archivo debe ser un FeatureCollection GeoJSON');
      }
      const name = file.name.replace(/\.(json|geojson)$/i, '');
      await db.bathymetryLayers.add({
        spotId: null,
        name,
        geojson: json,
        colorStops: DEFAULT_COLOR_STOPS,
        visible: true,
        locked: false,
        createdAt: Date.now(),
      });
      const all = await db.bathymetryLayers.toArray();
      await Promise.all(
        all
          .filter((l) => l.name !== name)
          .map((l) =>
            l.id
              ? db.bathymetryLayers.update(l.id, { visible: false })
              : Promise.resolve(),
          ),
      );
    } catch (e) {
      setImportError(e instanceof Error ? e.message : 'Error al importar');
    }
  }

  return (
    <div>
      <div className="map-wrap">
        <div className="map-toolbar">
          <button
            type="button"
            className="btn btn--sm"
            onClick={() =>
              setBasemap((b) => (b === 'streets' ? 'satellite' : 'streets'))
            }
          >
            {basemap === 'streets' ? 'Satélite' : 'Calles'}
          </button>
          {activeLayer?.visible ? (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => void toggleLayerVisible()}
            >
              Ocultar batimetría
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => void showFirstLayer()}
            >
              Mostrar batimetría
            </button>
          )}
          <label className="btn btn--ghost btn--sm" style={{ cursor: 'pointer' }}>
            Importar GeoJSON
            <input
              type="file"
              accept=".json,.geojson,application/geo+json,application/json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importGeoJson(f);
                e.target.value = '';
              }}
            />
          </label>
        </div>

        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

        <BathymetryLayer
          map={mapReady ? mapRef.current : null}
          layer={activeLayer as BathyLayer | undefined}
        />

        {activeLayer && (
          <DepthLegend
            colorStops={activeLayer.colorStops}
            visible={!!activeLayer.visible}
            locked={activeLayer.locked}
            onToggleVisible={() => void toggleLayerVisible()}
            onToggleLocked={() => void toggleLayerLocked()}
          />
        )}
      </div>

      <p className="muted" style={{ marginTop: '0.65rem' }}>
        Tocá el mapa para marcar un spot.
        {spots.length > 0 && (
          <>
            {' '}
            Marcadores:{' '}
            {spots.map((s) => (
              <Link key={s.id} to={`/spots/${s.id}`} style={{ marginRight: 8 }}>
                {s.name}
              </Link>
            ))}
          </>
        )}
      </p>
      {importError && <p style={{ color: 'var(--danger)' }}>{importError}</p>}

      {draftPos && (
        <SpotForm
          initial={draftPos}
          onCancel={() => setDraftPos(null)}
          onSubmit={saveSpot}
        />
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
