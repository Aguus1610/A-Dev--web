import { useEffect, useState } from 'react';
import {
  fetchWeather,
  pressureTrend,
  weatherCodeLabel,
  windDirectionLabel,
  type WeatherBundle,
} from '../../lib/weather';

interface Props {
  lat: number;
  lng: number;
  showHourly?: boolean;
  compact?: boolean;
}

export default function WeatherCard({
  lat,
  lng,
  showHourly = false,
  compact = false,
}: Props) {
  const [data, setData] = useState<WeatherBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hourlyOpen, setHourlyOpen] = useState(showHourly);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchWeather(lat, lng, ctrl.signal)
      .then(setData)
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Error de clima');
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="card">
        <p className="muted">Cargando clima…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card">
        <p className="muted">{error ?? 'Sin datos de clima'}</p>
      </div>
    );
  }

  const { current, hourly } = data;
  const trend = pressureTrend(hourly, current.time);
  const now = new Date();
  const hourStart = hourly.time.findIndex((t) => new Date(t) >= now);
  const sliceStart = hourStart < 0 ? 0 : hourStart;
  const hours = hourly.time.slice(sliceStart, sliceStart + 24);

  return (
    <div className="card fade-in">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Clima</h3>
        <span className="pill">{weatherCodeLabel(current.weatherCode)}</span>
      </div>
      <p className="muted" style={{ margin: '0.35rem 0 0.75rem' }}>
        Open-Meteo · {data.timezone}
      </p>

      <div className="weather-grid">
        <div className="weather-stat">
          <strong>{Math.round(current.temperature)}°</strong>
          <span>Temp · sens. {Math.round(current.feelsLike)}°</span>
        </div>
        <div className="weather-stat">
          <strong>
            {Math.round(current.windSpeed)}{' '}
            <small style={{ fontSize: '0.7rem' }}>km/h</small>
          </strong>
          <span>
            Viento {windDirectionLabel(current.windDirection)} · ráfagas{' '}
            {Math.round(current.windGusts)}
          </span>
        </div>
        {!compact && (
          <>
            <div className="weather-stat">
              <strong>{Math.round(current.pressure)}</strong>
              <span>hPa · {trend}</span>
            </div>
            <div className="weather-stat">
              <strong>{current.cloudCover}%</strong>
              <span>
                Nubes
                {current.precipitation > 0
                  ? ` · ${current.precipitation} mm`
                  : ''}
              </span>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        className="btn btn--ghost btn--sm"
        style={{ marginTop: '0.75rem' }}
        onClick={() => setHourlyOpen((v) => !v)}
      >
        {hourlyOpen ? 'Ocultar horas' : 'Ver por horas'}
      </button>

      {hourlyOpen && (
        <div className="hourly-scroll">
          {hours.map((t, i) => {
            const idx = sliceStart + i;
            const d = new Date(t);
            return (
              <div key={t} className="hourly-item">
                <div className="muted">
                  {d.getHours().toString().padStart(2, '0')}h
                </div>
                <strong>{Math.round(hourly.temperature[idx])}°</strong>
                <div>{Math.round(hourly.windSpeed[idx])} km/h</div>
                <div className="muted">
                  {hourly.precipitationProbability[idx] ?? 0}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
