# Anzuelando Pesca

PWA para cruzar spots de pesca, calendario lunar (diurna/nocturna), capas de batimetría y clima (Open-Meteo).

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Uso

- **Hoy**: resumen lunar del día + clima del spot activo
- **Mapa**: marcar spots, satélite/calles, importar GeoJSON de profundidad
- **Lunar**: calendario mensual estilo Anzuelando
- **Spots**: listado, edición y asociación de capas

Los datos viven en IndexedDB del navegador (sin cuenta ni servidor).

### GeoJSON de batimetría

Cada feature debe tener `properties.depth` en metros (número). Polígonos o líneas.

## Stack

Vite, React, TypeScript, MapLibre GL, Dexie, suncalc/fase lunar propia, Open-Meteo, vite-plugin-pwa.
