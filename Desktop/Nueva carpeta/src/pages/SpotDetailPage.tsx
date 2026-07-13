import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import WeatherCard from '../components/weather/WeatherCard';
import SpotForm, { type SpotDraft } from '../components/spots/SpotForm';

export default function SpotDetailPage() {
  const { id } = useParams();
  const spotId = Number(id);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const spot = useLiveQuery(
    () => (Number.isFinite(spotId) ? db.spots.get(spotId) : undefined),
    [spotId],
  );
  const layers =
    useLiveQuery(() => db.bathymetryLayers.toArray(), []) ?? [];

  if (spot === undefined) {
    return (
      <div className="card">
        <p className="muted">Cargando…</p>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="card">
        <p>Spot no encontrado.</p>
        <Link to="/spots">Volver</Link>
      </div>
    );
  }

  async function saveEdit(draft: SpotDraft) {
    await db.spots.update(spotId, { ...draft, updatedAt: Date.now() });
    setEditing(false);
  }

  async function setActive() {
    await db.settings.update(1, { activeSpotId: spotId });
  }

  async function remove() {
    if (!confirm('¿Eliminar este spot?')) return;
    await db.spots.delete(spotId);
    const settings = await db.settings.get(1);
    if (settings?.activeSpotId === spotId) {
      await db.settings.update(1, { activeSpotId: null });
    }
    navigate('/spots');
  }

  async function assignLayer(layerId: number, assign: boolean) {
    await db.bathymetryLayers.update(layerId, {
      spotId: assign ? spotId : null,
    });
  }

  async function toggleLayer(layerId: number, visible: boolean) {
    const all = await db.bathymetryLayers.toArray();
    await Promise.all(
      all.map((l) =>
        l.id
          ? db.bathymetryLayers.update(l.id, {
              visible: l.id === layerId ? visible : visible ? false : l.visible,
            })
          : Promise.resolve(),
      ),
    );
  }

  return (
    <div className="fade-in">
      <p className="brand-mark">Anzuelando Pesca</p>
      <h1 className="page-title">{spot.name}</h1>
      <p className="page-sub">
        {spot.lat.toFixed(5)}, {spot.lng.toFixed(5)}
      </p>

      <div className="card">
        {spot.species.length > 0 && (
          <p>
            <strong>Especies:</strong> {spot.species.join(', ')}
          </p>
        )}
        {spot.access && (
          <p>
            <strong>Acceso:</strong> {spot.access}
          </p>
        )}
        {spot.notes && (
          <p style={{ whiteSpace: 'pre-wrap' }}>
            <strong>Notas:</strong> {spot.notes}
          </p>
        )}
        {spot.tags.length > 0 && (
          <div className="row">
            {spot.tags.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="row" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="btn btn--sm" onClick={() => void setActive()}>
            Usar en Hoy
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
          <Link to="/mapa" className="btn btn--ghost btn--sm">
            Ver en mapa
          </Link>
          <button type="button" className="btn btn--danger btn--sm" onClick={() => void remove()}>
            Eliminar
          </button>
        </div>
      </div>

      <WeatherCard lat={spot.lat} lng={spot.lng} />

      <div className="card">
        <h2 style={{ fontSize: '1.1rem' }}>Capas de batimetría</h2>
        <p className="muted">
          Asociá capas GeoJSON a este spot o activálas en el mapa.
        </p>
        {layers.length === 0 && <p className="muted">No hay capas. Importá desde el mapa.</p>}
        <div className="stack">
          {layers.map((l) => (
            <div
              key={l.id}
              className="row"
              style={{ justifyContent: 'space-between', background: 'rgba(0,0,0,.2)', padding: '0.65rem', borderRadius: 10 }}
            >
              <div>
                <strong>{l.name}</strong>
                <div className="muted" style={{ fontSize: '0.8rem' }}>
                  {l.spotId === spotId
                    ? 'Asociada a este spot'
                    : l.spotId
                      ? `Spot #${l.spotId}`
                      : 'Global'}
                  {l.visible ? ' · visible' : ''}
                </div>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => l.id && void toggleLayer(l.id, !l.visible)}
                >
                  {l.visible ? 'Ocultar' : 'Mostrar'}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() =>
                    l.id && void assignLayer(l.id, l.spotId !== spotId)
                  }
                >
                  {l.spotId === spotId ? 'Quitar' : 'Asociar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <SpotForm
          title="Editar spot"
          initial={{
            name: spot.name,
            lat: spot.lat,
            lng: spot.lng,
            notes: spot.notes,
            species: spot.species,
            access: spot.access,
            tags: spot.tags,
          }}
          onCancel={() => setEditing(false)}
          onSubmit={saveEdit}
        />
      )}
    </div>
  );
}
