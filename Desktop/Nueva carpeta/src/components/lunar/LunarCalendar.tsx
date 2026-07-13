import { useMemo, useState } from 'react';
import {
  MONTH_NAMES,
  RATING_COLORS,
  RATING_LABELS,
  TIDE_TIPS,
  forecastForMonth,
  type DayFishingForecast,
} from '../../lib/lunarFishing';
import RatingBadge from './RatingBadge';

function trendIcons(trend: number): string {
  if (trend <= 0) return '☠';
  return '🐟'.repeat(Math.min(4, trend));
}

interface Props {
  initialYear?: number;
  initialMonth?: number;
}

export default function LunarCalendar({ initialYear, initialMonth }: Props) {
  const now = new Date();
  const [year, setYear] = useState(initialYear ?? now.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? now.getMonth());
  const [selected, setSelected] = useState<DayFishingForecast | null>(null);

  const days = useMemo(() => forecastForMonth(year, month), [year, month]);
  const today = now.getDate();
  const isCurrentMonth =
    year === now.getFullYear() && month === now.getMonth();

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelected(null);
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelected(null);
  }

  return (
    <div className="fade-in">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <button type="button" className="btn btn--ghost btn--sm" onClick={prevMonth}>
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
          {MONTH_NAMES[month]} {year}
        </h2>
        <button type="button" className="btn btn--ghost btn--sm" onClick={nextMonth}>
          →
        </button>
      </div>

      <p className="muted" style={{ marginTop: 0 }}>
        Pesca diurna — colores según fase lunar
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table className="lunar-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Pesca</th>
              <th>Luna</th>
              <th>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr
                key={d.dayOfMonth}
                className={isCurrentMonth && d.dayOfMonth === today ? 'is-today' : undefined}
                style={{ background: RATING_COLORS[d.diurna], cursor: 'pointer' }}
                onClick={() => setSelected(d)}
              >
                <td>
                  <strong>{d.dayOfMonth}</strong>{' '}
                  <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>
                    {d.weekday.slice(0, 3)}
                  </span>
                </td>
                <td>{RATING_LABELS[d.diurna]}</td>
                <td>
                  {d.phaseLabel}
                  {d.note && d.dayOfMonth % 7 === 0 ? (
                    <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>{d.note}</div>
                  ) : null}
                </td>
                <td className="trend-fish">{trendIcons(d.trend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="card" style={{ marginTop: '0.85rem' }}>
          <h3>
            {selected.dayOfMonth} {MONTH_NAMES[month]}
          </h3>
          <div className="stack">
            <div className="row">
              <span className="muted">Diurna</span>
              <RatingBadge rating={selected.diurna} trend={selected.trend} />
            </div>
            <div className="row">
              <span className="muted">Nocturna</span>
              <RatingBadge rating={selected.nocturna} />
            </div>
            <p className="muted" style={{ margin: 0 }}>
              Fase: {selected.phaseLabel} · Iluminación{' '}
              {Math.round(selected.illumination * 100)}%
            </p>
            {selected.note && <p style={{ margin: 0 }}>{selected.note}</p>}
          </div>
        </div>
      )}

      <div className="tide-banner">
        <strong>Mareas</strong>
        <ul>
          {TIDE_TIPS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
