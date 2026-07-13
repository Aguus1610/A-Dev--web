import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, getActiveSpot, type Spot } from '../lib/db';
import {
  MONTH_NAMES,
  TIDE_TIPS,
  forecastForDate,
} from '../lib/lunarFishing';
import RatingBadge from '../components/lunar/RatingBadge';
import WeatherCard from '../components/weather/WeatherCard';

export default function HomePage() {
  const [spot, setSpot] = useState<Spot | undefined>();
  const settings = useLiveQuery(() => db.settings.get(1), []);
  const today = forecastForDate(new Date());
  const now = new Date();

  useEffect(() => {
    void getActiveSpot().then(setSpot);
  }, [settings?.activeSpotId]);

  return (
    <div className="fade-in">
      <p className="brand-mark">Anzuelando Pesca</p>
      <h1 className="page-title">Hoy</h1>
      <p className="page-sub">
        {today.weekday} {today.dayOfMonth} de {MONTH_NAMES[now.getMonth()]} ·{' '}
        {today.phaseLabel}
      </p>

      <div className="card">
        <h2 style={{ fontSize: '1.15rem' }}>Pronóstico lunar</h2>
        <div className="stack">
          <div className="row">
            <span className="muted" style={{ minWidth: 72 }}>
              Diurna
            </span>
            <RatingBadge rating={today.diurna} trend={today.trend} />
          </div>
          <div className="row">
            <span className="muted" style={{ minWidth: 72 }}>
              Nocturna
            </span>
            <RatingBadge rating={today.nocturna} />
          </div>
          {today.note && <p style={{ margin: 0 }}>{today.note}</p>}
          <Link to="/lunar" className="btn btn--ghost btn--sm" style={{ alignSelf: 'flex-start' }}>
            Ver calendario del mes
          </Link>
        </div>
      </div>

      {spot ? (
        <>
          <div className="card">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Spot activo</h2>
              <Link to={`/spots/${spot.id}`} className="pill">
                Detalle
              </Link>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
              {spot.name}
            </p>
            {spot.species.length > 0 && (
              <p className="muted" style={{ margin: '0.35rem 0 0' }}>
                {spot.species.join(' · ')}
              </p>
            )}
          </div>
          <WeatherCard lat={spot.lat} lng={spot.lng} compact />
        </>
      ) : (
        <div className="card">
          <p className="muted">
            Todavía no hay spot activo.{' '}
            <Link to="/mapa">Marcá uno en el mapa</Link>.
          </p>
        </div>
      )}

      <div className="tide-banner">
        <strong>Tips de marea</strong>
        <ul>
          {TIDE_TIPS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
