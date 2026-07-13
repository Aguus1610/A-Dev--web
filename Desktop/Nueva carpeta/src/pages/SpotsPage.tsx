import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export default function SpotsPage() {
  const spots = useLiveQuery(() => db.spots.orderBy('updatedAt').reverse().toArray(), []) ?? [];
  const settings = useLiveQuery(() => db.settings.get(1), []);

  async function setActive(id: number) {
    await db.settings.update(1, { activeSpotId: id });
  }

  async function removeSpot(id: number) {
    if (!confirm('¿Eliminar este spot?')) return;
    await db.spots.delete(id);
    if (settings?.activeSpotId === id) {
      await db.settings.update(1, { activeSpotId: null });
    }
  }

  return (
    <div className="fade-in">
      <p className="brand-mark">Anzuelando Pesca</p>
      <h1 className="page-title">Mis spots</h1>
      <p className="page-sub">
        Lugares que frecuentás.{' '}
        <Link to="/mapa">Agregar en el mapa</Link>
      </p>

      {spots.length === 0 && (
        <div className="card">
          <p className="muted">Sin spots todavía.</p>
        </div>
      )}

      <div className="stack">
        {spots.map((s) => (
          <div key={s.id} className="card">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem' }}>
                <Link to={`/spots/${s.id}`}>{s.name}</Link>
              </h2>
              {settings?.activeSpotId === s.id && (
                <span className="pill">Activo</span>
              )}
            </div>
            {s.species.length > 0 && (
              <p className="muted" style={{ margin: '0.4rem 0' }}>
                {s.species.join(' · ')}
              </p>
            )}
            {s.access && <p style={{ margin: '0.25rem 0' }}>{s.access}</p>}
            <div className="row" style={{ marginTop: '0.65rem' }}>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => s.id && void setActive(s.id)}
              >
                Usar en Hoy
              </button>
              <Link to={`/spots/${s.id}`} className="btn btn--sm">
                Abrir
              </Link>
              <button
                type="button"
                className="btn btn--danger btn--sm"
                onClick={() => s.id && void removeSpot(s.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
