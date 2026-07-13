import type { FishingRating } from '../../lib/lunarFishing';
import { RATING_COLORS, RATING_LABELS } from '../../lib/lunarFishing';

interface Props {
  rating: FishingRating;
  trend?: number;
  label?: string;
}

function trendIcons(trend: number): string {
  if (trend <= 0) return '☠';
  return '🐟'.repeat(Math.min(4, trend));
}

export default function RatingBadge({ rating, trend, label }: Props) {
  return (
    <span
      className="rating-badge"
      style={{ background: RATING_COLORS[rating] }}
    >
      {label ?? RATING_LABELS[rating]}
      {trend !== undefined && (
        <span className="trend-fish" aria-label={`${trend} de tendencia`}>
          {trendIcons(trend)}
        </span>
      )}
    </span>
  );
}
