import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import SectionHeader from '../Section'
import { ArrowRight, Check, ChevronDown, Send } from '../icons'
import {
  APP_FUNCTIONS,
  IDENTITY_CHOICES,
  LOGO_CHOICES,
  PHOTO_CHOICES,
  PROJECT_TYPES,
  STYLE_PREFS,
  TIMELINES,
  WEB_SECTIONS,
  computeQuote,
  formatRange,
} from '../../quote/catalog'
import type {
  CustomPage,
  ProjectType,
  QuoteSelection,
  TimelineId,
} from '../../quote/catalog'
import QuoteSummary from './QuoteSummary'
import QuoteSuccess from './QuoteSuccess'
import { StepContact, StepDetails, StepOperation, StepStructure, StepStyle, StepType } from './QuoteSteps'
import type { ContactForm, DetailsForm, StyleForm } from './QuoteSteps'

const SERVICE_ID = 'service_oh4erk7'
const PUBLIC_KEY = 'SHCCKv__9-9XVNQDv'
const QUOTE_TEMPLATE_ID = 'template_ddtz01q'
const FALLBACK_TEMPLATE_ID = 'template_ke1v1qj'

const STEPS = ['Tipo', 'Estructura', 'Imagen y estilo', 'Operación', 'Detalles', 'Envío']

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function QuoteSection() {
  const [step, setStep] = useState(0)
  const [projectId, setProjectId] = useState<ProjectType | null>(null)
  const [selection, setSelection] = useState<QuoteSelection>({})
  const [customPages, setCustomPages] = useState<CustomPage[]>([])
  const [style, setStyle] = useState<StyleForm>({
    logo: 'tengo',
    identity: 'si',
    stylePref: 'moderno',
    photos: 'propias',
  })
  const [details, setDetails] = useState<DetailsForm>({
    sector: 'Comercio / Retail',
    budget: 'USD 200–500',
    references: '',
    description: '',
  })
  const [timeline, setTimeline] = useState<TimelineId>('normal')
  const [contact, setContact] = useState<ContactForm>({ name: '', email: '', phone: '', company: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [mobileOpen, setMobileOpen] = useState(false)

  const project = PROJECT_TYPES.find((p) => p.id === projectId) ?? null
  const timelineObj = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[0]

  const estimate = useMemo(
    () =>
      projectId
        ? computeQuote({
            projectId,
            selection,
            customPages,
            logo: style.logo,
            identity: style.identity,
            stylePref: style.stylePref,
            photos: style.photos,
            timeline,
          })
        : null,
    [projectId, selection, customPages, style.logo, style.identity, style.stylePref, style.photos, timeline],
  )

  function selectProject(id: ProjectType) {
    setProjectId(id)
    setCustomPages([])
    const next: QuoteSelection = {}
    if (id === 'web') {
      next.principal = true
      next.contacto = true
    }
    setSelection(next)
  }

  function toggleOption(optionId: string) {
    setSelection((prev) => ({ ...prev, [optionId]: !prev[optionId] }))
  }

  function removeItem(itemId: string) {
    if (itemId.startsWith('custom-')) {
      const pageId = Number(itemId.replace('custom-', ''))
      setCustomPages((pages) => pages.filter((p) => p.id !== pageId))
      return
    }
    setSelection((prev) => ({ ...prev, [itemId]: false }))
  }

  const addPage = () => {
    setCustomPages((pages) => [
      ...pages,
      { id: Date.now(), name: '', description: '' },
    ])
  }

  const updatePage = (pageId: number, patch: Partial<CustomPage>) => {
    setCustomPages((pages) => pages.map((p) => (p.id === pageId ? { ...p, ...patch } : p)))
  }

  const removePage = (pageId: number) => {
    setCustomPages((pages) => pages.filter((p) => p.id !== pageId))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    if (step < 5) {
      setStep(step + 1)
      return
    }
    void sendQuote()
  }

  const buildStructureText = () => {
    if (!project) return ''
    const options = project.id === 'web' ? WEB_SECTIONS : APP_FUNCTIONS
    const chosen = options.filter((o) => selection[o.id]).map((o) => `- ${o.label}`)
    const pages = customPages
      .filter((p) => p.name.trim())
      .map((p) => `- Página adicional "${p.name.trim()}"${p.description.trim() ? ` — ${p.description.trim()}` : ''}`)
    const all = [...chosen, ...pages]
    return all.length ? all.join('\n') : 'Sin agregados por ahora.'
  }

  const buildStyleSummary = () => {
    const logoLabel = LOGO_CHOICES.find((l) => l.id === style.logo)?.label ?? ''
    const identityLabel = IDENTITY_CHOICES.find((i) => i.id === style.identity)?.label ?? ''
    const styleLabel = STYLE_PREFS.find((s) => s.id === style.stylePref)?.label ?? ''
    const photoLabel = PHOTO_CHOICES.find((p) => p.id === style.photos)?.label ?? ''
    return [
      `Logo: ${logoLabel}`,
      `Identidad de marca: ${identityLabel}`,
      `Estilo visual: ${styleLabel}`,
      `Fotografías: ${photoLabel}`,
    ].join('\n')
  }

  const sendQuote = async () => {
    if (!project || !estimate) return
    setStatus('sending')

    const featuresHtml = estimate.items
      .map(
        (i) =>
          `<tr><td style="padding:6px 0;color:#64748b;">${i.label}</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#0f172a;">${formatRange(i.price)}${i.monthly ? ' /mes' : ''}</td></tr>`,
      )
      .join('')

    const summaryText = [
      'NUEVA COTIZACIÓN — A-Dev',
      '',
      `Tipo de proyecto: ${project.name}`,
      `Estimado: ${formatRange(estimate.oneTime)}`,
      ...(estimate.monthly ? [`Mantenimiento: ${formatRange(estimate.monthly)} /mes`] : []),
      `Plazo: ${timelineObj.label}`,
      '',
      'Estructura:',
      buildStructureText(),
      '',
      'Imagen y estilo:',
      buildStyleSummary(),
      '',
      ...(estimate.items.length
        ? ['Desglose con precios:', ...estimate.items.map((i) => `- ${i.label} (${formatRange(i.price)}${i.monthly ? ' /mes' : ''})`), '']
        : []),
      `Rubro: ${details.sector}`,
      `Presupuesto del cliente: ${details.budget}`,
      `Referencias: ${details.references || 'No indicó'}`,
      '',
      `Descripción: ${details.description}`,
      '',
      `Contacto: ${contact.name} — ${contact.email}` +
        (contact.phone ? ` — ${contact.phone}` : '') +
        (contact.company ? ` (${contact.company})` : ''),
    ].join('\n')

    const payload = {
      from_name: contact.name,
      from_email: contact.email,
      from_phone: contact.phone || 'No indicó',
      from_company: contact.company || 'No indicó',
      project_type: project.name,
      base_range: formatRange(project.base),
      budget_total: formatRange(estimate.oneTime),
      budget_monthly: estimate.monthly ? formatRange(estimate.monthly) : 'No',
      timeline_label: timelineObj.label,
      structure_text: buildStructureText(),
      style_summary: buildStyleSummary(),
      sector: details.sector,
      budget_client: details.budget,
      references: details.references || 'No indicó',
      description: details.description,
      features_text: featuresHtml,
      message: summaryText,
      time: new Date().toLocaleString('es-AR'),
      page_url: window.location.href,
      source: 'Cotizador interactivo',
      site_name: 'A-Dev',
      site_url: window.location.origin,
      to_email: 'adevsoft2026@gmail.com',
      subject: `Cotización ${project.name} — ${contact.name}`,
    }

    try {
      const emailjs = await import('@emailjs/browser')
      emailjs.init({ publicKey: PUBLIC_KEY })
      try {
        await emailjs.send(SERVICE_ID, QUOTE_TEMPLATE_ID, payload)
      } catch {
        await emailjs.send(SERVICE_ID, FALLBACK_TEMPLATE_ID, payload)
      }
      setStatus('success')
    } catch (error) {
      console.error('Error al enviar la cotización', error)
      setStatus('error')
    }
  }

  const restart = () => {
    setStatus('idle')
    setStep(0)
    setProjectId(null)
    setSelection({})
    setCustomPages([])
    setStyle({ logo: 'tengo', identity: 'si', stylePref: 'moderno', photos: 'propias' })
    setTimeline('normal')
    setDetails({ sector: 'Comercio / Retail', budget: 'USD 200–500', references: '', description: '' })
    setContact({ name: '', email: '', phone: '', company: '' })
    setMobileOpen(false)
  }

  const waText = project && estimate
    ? [
        '¡Hola Agustín! Armé mi cotización en A-Dev:',
        `- Tipo de proyecto: ${project.name}`,
        `- Estimado: ${formatRange(estimate.oneTime)}`,
        ...(estimate.monthly ? [`- Mantenimiento: ${formatRange(estimate.monthly)} /mes`] : []),
        `- Plazo: ${timelineObj.label}`,
        ...(estimate.items.length
          ? [`- Extras: ${estimate.items.map((i) => i.label).join(', ')}`]
          : []),
        ...(details.description ? [`- Detalle: ${details.description.slice(0, 300)}`] : []),
      ].join('\n')
    : ''
  const whatsappHref = `https://wa.me/5492302672827?text=${encodeURIComponent(waText)}`

  return (
    <section id="cotizar" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="container-x relative pb-28 lg:pb-0">
        <SectionHeader
          eyebrow="Cotizador"
          title={
            <>
              Armá tu presupuesto <span className="text-gradient">en minutos</span>
            </>
          }
          sub="Empezá por lo más básico: definimos el tipo de proyecto, la estructura, el estilo y los servicios de operación. El estimado se actualiza solo con cada clic."
        />

        {status === 'success' && project && estimate ? (
          <div className="mt-12 md:mt-16">
            <QuoteSuccess
              planName={project.name}
              estimate={estimate}
              timelineLabel={timelineObj.label}
              whatsappHref={whatsappHref}
              onRestart={restart}
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[minmax(0,1fr)_400px]">
            <div>
              <ol className="flex items-center">
                {STEPS.map((label, i) => (
                  <li key={label} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
                    <div className="flex shrink-0 flex-col items-center gap-1.5">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                          i < step
                            ? 'border-transparent bg-gradient-to-br from-indigo-500 to-violet-500 text-white'
                            : i === step
                              ? 'border-indigo-400/60 bg-indigo-500/10 text-white'
                              : 'border-white/10 bg-white/[0.03] text-zinc-600'
                        }`}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-[11px] sm:block ${
                          i === step ? 'font-medium text-white' : 'text-zinc-600'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`mx-2 h-px flex-1 sm:mb-5 ${
                          i < step ? 'bg-indigo-400/50' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>

              <form onSubmit={handleSubmit} className="card-glass mt-6 p-6 sm:p-8">
                {step === 0 && <StepType value={projectId} onSelect={selectProject} />}
                {step === 1 && projectId && (
                  <StepStructure
                    projectId={projectId}
                    selection={selection}
                    customPages={customPages}
                    onToggle={toggleOption}
                    onAddPage={addPage}
                    onRemovePage={removePage}
                    onUpdatePage={updatePage}
                  />
                )}
                {step === 2 && <StepStyle value={style} onChange={(patch) => setStyle((s) => ({ ...s, ...patch }))} />}
                {step === 3 && <StepOperation selection={selection} onToggle={toggleOption} />}
                {step === 4 && (
                  <StepDetails
                    value={{ ...details, timeline }}
                    onChange={(patch) => {
                      const { timeline: t, ...rest } = patch
                      if (t) setTimeline(t)
                      setDetails((d) => ({ ...d, ...rest }))
                    }}
                  />
                )}
                {step === 5 && <StepContact value={contact} onChange={(patch) => setContact((c) => ({ ...c, ...patch }))} />}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="mt-6 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-300"
                  >
                    Hubo un error al enviar. Probá de nuevo o escribime directo a adevsoft2026@gmail.com
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost !px-5 !py-2.5">
                      Volver
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 5 ? (
                    <button
                      type="submit"
                      disabled={step === 0 && !projectId}
                      className="btn-primary !px-6 !py-2.5"
                    >
                      {step === 0 && !projectId ? 'Elegí un tipo de proyecto' : 'Continuar'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button type="submit" disabled={status === 'sending'} className="btn-primary !px-6 !py-2.5">
                      {status === 'sending' ? (
                        <>
                          <span className="spinner h-4 w-4 rounded-full border-2 border-white/40 border-t-white" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar cotización
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                {project && estimate && (
                  <QuoteSummary
                    planName={project.name}
                    estimate={estimate}
                    timelineLabel={timelineObj.label}
                    onRemove={removeItem}
                  />
                )}
              </div>
            </aside>
          </div>
        )}
      </div>

      {status !== 'success' && project && estimate && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0d17]/95 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            className="flex w-full items-center justify-between px-5 py-3.5"
          >
            <span className="text-sm text-zinc-400">
              Estimado:{' '}
              <span className="font-semibold text-white">{formatRange(estimate.oneTime)}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-indigo-300">
              Detalle
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
              />
            </span>
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4">
                <QuoteSummary
                  planName={project.name}
                  estimate={estimate}
                  timelineLabel={timelineObj.label}
                  onRemove={removeItem}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
