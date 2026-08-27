import { formatRange } from '../../quote/catalog'
import type { QuoteEstimate } from '../../quote/catalog'
import { Check, Whatsapp } from '../icons'

type QuoteSuccessProps = {
  planName: string
  estimate: QuoteEstimate
  timelineLabel: string
  whatsappHref: string
  onRestart: () => void
}

export default function QuoteSuccess({
  planName,
  estimate,
  timelineLabel,
  whatsappHref,
  onRestart,
}: QuoteSuccessProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="card-glass relative overflow-hidden p-8 text-center sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10"
        />
        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 to-cyan-500/15 text-emerald-300">
            <Check className="h-8 w-8" />
          </span>
          <h3 className="font-display mt-6 text-2xl font-bold text-white sm:text-3xl">
            ¡Tu cotización está lista!
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            Ya me llegó el detalle de tu proyecto. Te respondo en menos de 24 horas con la
            propuesta final.
          </p>

          <div className="mx-auto mt-8 max-w-sm space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Plan</span>
              <span className="text-right font-medium text-white">{planName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Estimado</span>
              <span className="font-semibold text-white">{formatRange(estimate.oneTime)}</span>
            </div>
            {estimate.monthly && (
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">Mantenimiento</span>
                <span className="font-semibold text-emerald-300">
                  {formatRange(estimate.monthly)} /mes
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Plazo</span>
              <span className="text-right text-zinc-300">{timelineLabel}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-emerald-400 hover:to-emerald-300 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <Whatsapp className="h-4 w-4" />
              Charlar por WhatsApp
            </a>
            <button type="button" onClick={onRestart} className="btn-ghost">
              Hacer otra cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
