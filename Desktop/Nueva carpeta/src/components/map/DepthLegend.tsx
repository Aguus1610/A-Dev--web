import type { ColorStop } from '../../lib/db';

interface Props {
  colorStops: ColorStop[];
  visible: boolean;
  locked: boolean;
  onToggleVisible: () => void;
  onToggleLocked: () => void;
}

export default function DepthLegend({
  colorStops,
  visible,
  locked,
  onToggleVisible,
  onToggleLocked,
}: Props) {
  if (!visible) return null;

  const sorted = [...colorStops].sort((a, b) => b.depth - a.depth);

  return (
    <div className="depth-legend" aria-label="Leyenda de profundidad">
      <div className="depth-legend__stops">
        {sorted.map((s) => (
          <div
            key={s.depth}
            className="depth-legend__stop"
            style={{ background: s.color }}
            title={`${s.depth} m`}
          >
            {s.depth}m
          </div>
        ))}
      </div>
      <div className="depth-legend__footer">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          style={{ padding: '0.2rem 0.35rem', minWidth: 0 }}
          title={visible ? 'Ocultar capa' : 'Mostrar capa'}
          onClick={onToggleVisible}
          aria-label="Alternar visibilidad"
        >
          ☐
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          style={{ padding: '0.2rem 0.35rem', minWidth: 0 }}
          title={locked ? 'Desbloquear' : 'Bloquear'}
          onClick={onToggleLocked}
          aria-label="Alternar candado"
        >
          {locked ? '🔒' : '🔓'}
        </button>
      </div>
    </div>
  );
}
