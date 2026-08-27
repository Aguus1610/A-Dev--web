import { formatRange } from '../../quote/catalog'
import type { QuoteEstimate } from '../../quote/catalog'
import { Close, Sparkles } from '../icons'

type QuoteSummaryProps = {
  planName: string
  estimate: QuoteEstimate
  timelineLabel: string
  onRemove: (optionId: string) => void
}

export default function QuoteSummary({
  planName,
  estimate,
  timelineLabel,
  onRemove,
}: QuoteSummaryProps) {
  return (
    <div className="card-glass overflow-hidden !rounded-2xl">
      <div className="border-b border-white/5 bg-white/[0.03] px-5 py-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          Tu presupuesto
        </p>
        <p className="mt-1 text-sm font-medium text-white">{planName}</p>
      </div>

      <div className="max-h-72 space-y-2.5 overflow-y-auto px-5 py-4">
        {estimate.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-400">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Quitar ${item.label}`}
                className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-500 transition-colors hover:border-red-400/40 hover:text-red-300"
              >
                <Close className="h-2.5 w-2.5" />
              </button>
              {item.label}
              {item.monthly && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
                  /mes
                </span>
              )}
            </span>
          </div>
        ))}
        {estimate.items.length === 0 && (
          <p className="text-xs text-zinc-600">
            Todavía no agregaste nada. El estimado parte de la base del tipo de proyecto.
          </p>
        )}
      </div>

      <div className="border-t border-white/5 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs uppercase tracking-wider text-zinc-500">Estimado</span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            {formatRange(estimate.oneTime)}
          </span>
        </div>
        {estimate.monthly && (
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Mantenimiento</span>
            <span className="text-sm font-semibold text-emerald-300">
              {formatRange(estimate.monthly)} /mes
            </span>
          </div>
        )}
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
          Plazo: {timelineLabel}. Estimación de referencia — el valor final se define en la
          propuesta, sin compromiso.
        </p>
      </div>
    </div>
  )
}
