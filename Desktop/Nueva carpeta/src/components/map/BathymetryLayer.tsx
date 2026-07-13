import { useEffect } from 'react';
import type { Map as MapLibreMap, GeoJSONSource } from 'maplibre-gl';
import type { Feature, FeatureCollection } from 'geojson';
import type { BathymetryLayer as BathyLayer, ColorStop } from '../../lib/db';

function colorForDepth(depth: number, stops: ColorStop[]): string {
  if (!stops.length) return '#0077b6';
  const sorted = [...stops].sort((a, b) => a.depth - b.depth);
  if (depth <= sorted[0].depth) return sorted[0].color;
  if (depth >= sorted[sorted.length - 1].depth) {
    return sorted[sorted.length - 1].color;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    if (depth >= sorted[i].depth && depth <= sorted[i + 1].depth) {
      return Math.abs(depth - sorted[i].depth) <=
        Math.abs(depth - sorted[i + 1].depth)
        ? sorted[i].color
        : sorted[i + 1].color;
    }
  }
  return sorted[0].color;
}

function paintGeoJson(
  geojson: FeatureCollection,
  stops: ColorStop[],
): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: geojson.features.map((f: Feature) => {
      const depth = Number(f.properties?.depth ?? 0);
      return {
        ...f,
        properties: {
          ...f.properties,
          depth,
          fillColor: colorForDepth(depth, stops),
        },
      };
    }),
  };
}

const SOURCE_ID = 'bathymetry-source';
const FILL_ID = 'bathymetry-fill';
const LINE_ID = 'bathymetry-line';

function removeLayers(map: MapLibreMap) {
  if (map.getLayer(FILL_ID)) map.removeLayer(FILL_ID);
  if (map.getLayer(LINE_ID)) map.removeLayer(LINE_ID);
  if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
}

function applyLayer(map: MapLibreMap, layer: BathyLayer) {
  const data = paintGeoJson(layer.geojson, layer.colorStops);
  const existing = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
  if (existing) {
    existing.setData(data);
    return;
  }
  map.addSource(SOURCE_ID, { type: 'geojson', data });
  map.addLayer({
    id: FILL_ID,
    type: 'fill',
    source: SOURCE_ID,
    paint: {
      'fill-color': ['get', 'fillColor'],
      'fill-opacity': 0.55,
    },
  });
  map.addLayer({
    id: LINE_ID,
    type: 'line',
    source: SOURCE_ID,
    paint: {
      'line-color': '#062a3a',
      'line-width': 1,
      'line-opacity': 0.5,
    },
  });
}

interface Props {
  map: MapLibreMap | null;
  layer: BathyLayer | undefined;
}

export default function BathymetryLayer({ map, layer }: Props) {
  useEffect(() => {
    if (!map) return;

    const sync = () => {
      try {
        if (!layer?.visible) {
          removeLayers(map);
          return;
        }
        applyLayer(map, layer);
      } catch {
        /* style may be mid-reload */
      }
    };

    sync();
    map.on('styledata', sync);
    return () => {
      map.off('styledata', sync);
      try {
        removeLayers(map);
      } catch {
        /* map gone */
      }
    };
  }, [map, layer]);

  return null;
}
