import {
  APP_FUNCTIONS,
  BUDGET_OPTIONS,
  IDENTITY_CHOICES,
  LOGO_CHOICES,
  OPERATION_OPTIONS,
  PHOTO_CHOICES,
  PROJECT_TYPES,
  SECTORS,
  STYLE_PREFS,
  TIMELINES,
  WEB_SECTIONS,
} from '../../quote/catalog'
import type {
  CustomPage,
  ProjectType,
  QuoteOption,
  QuoteSelection,
  TimelineId,
} from '../../quote/catalog'
import { Check, Close } from '../icons'

export type DetailsForm = {
  sector: string
  budget: string
  references: string
  description: string
}

export type ContactForm = {
  name: string
  email: string
  phone: string
  company: string
}

export type StyleForm = {
  logo: string
  identity: string
  stylePref: string
  photos: string
}

function OptionRow({
  option,
  active,
  onToggle,
}: {
  option: QuoteOption
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
        active
          ? 'border-indigo-400/50 bg-indigo-500/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            active
              ? 'border-transparent bg-gradient-to-br from-indigo-500 to-violet-500 text-white'
              : 'border-white/20 bg-white/5 text-transparent'
          }`}
        >
          <Check className="h-3 w-3" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">{option.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{option.description}</p>
        </div>
      </div>
    </button>
  )
}

function RadioCard({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean
  onClick: () => void
  title: string
  hint: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`h-full rounded-xl border p-4 text-left transition-all duration-300 ${
        selected
          ? 'border-indigo-400/60 bg-indigo-500/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border ${
            selected ? 'border-indigo-400 bg-indigo-400' : 'border-white/25'
          }`}
        >
          {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
        </span>
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <p className="mt-1.5 pl-7 text-xs leading-relaxed text-zinc-500">{hint}</p>
    </button>
  )
}

// ── Paso 1: Tipo de proyecto ─────────────────────────────────

export function StepType({
  value,
  onSelect,
}: {
  value: ProjectType | null
  onSelect: (id: ProjectType) => void
}) {
  return (
    <div>
      <p className="text-sm text-zinc-400">
        Primero lo fundamental: ¿qué tipo de proyecto necesitás? Esto define la base de todo el
        presupuesto.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PROJECT_TYPES.map((project) => {
          const selected = value === project.id
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              aria-pressed={selected}
              className={`relative h-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                selected
                  ? 'border-indigo-400/60 bg-indigo-500/10 shadow-lg shadow-indigo-950/40'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
              }`}
            >
              {selected && (
                <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <h3 className="font-display flex items-center gap-2 pr-8 text-base font-semibold text-white">
                {project.name}
                {project.chip && (
                  <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
                    {project.chip}
                  </span>
                )}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{project.tagline}</p>
              <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                {project.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Paso 2: Estructura ───────────────────────────────────────

export function StepStructure({
  projectId,
  selection,
  customPages,
  onToggle,
  onAddPage,
  onRemovePage,
  onUpdatePage,
}: {
  projectId: ProjectType
  selection: QuoteSelection
  customPages: CustomPage[]
  onToggle: (optionId: string) => void
  onAddPage: () => void
  onRemovePage: (pageId: number) => void
  onUpdatePage: (pageId: number, patch: Partial<CustomPage>) => void
}) {
  if (projectId === 'web') {
    return (
      <div>
        <p className="text-sm text-zinc-400">
          Elegí las páginas y secciones que va a tener tu web. Después podés agregar páginas
          adicionales a medida, con su nombre y descripción.
        </p>

        <div className="mt-6 space-y-3">
          {WEB_SECTIONS.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              active={!!selection[option.id]}
              onToggle={() => onToggle(option.id)}
            />
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Páginas adicionales a medida
            </p>
          </div>
          <div className="mt-2.5 space-y-3">
            {customPages.map((page) => (
              <div
                key={page.id}
                className="rounded-xl border border-indigo-400/30 bg-indigo-500/[0.07] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                    Página adicional
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemovePage(page.id)}
                    aria-label="Quitar página adicional"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-500 transition-colors hover:border-red-400/40 hover:text-red-300"
                  >
                    <Close className="h-3 w-3" />
                  </button>
                </div>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                  <input
                    type="text"
                    value={page.name}
                    onChange={(e) => onUpdatePage(page.id, { name: e.target.value })}
                    placeholder="Nombre (ej: Preguntas frecuentes)"
                    aria-label="Nombre de la página adicional"
                    className="field !py-2.5"
                  />
                  <input
                    type="text"
                    value={page.description}
                    onChange={(e) => onUpdatePage(page.id, { description: e.target.value })}
                    placeholder="Descripción breve (ej: respuestas a dudas comunes sobre envíos)"
                    aria-label="Descripción de la página adicional"
                    className="field !py-2.5"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={onAddPage}
              className="btn-ghost w-full !py-2.5 text-sm"
            >
              + Agregar otra página
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-zinc-400">
        Marcá las funciones que tu sistema necesita cumplir. La base ya incluye login, panel, CRUD
        y base de datos.
      </p>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Incluidas en la base
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {['Login y roles', 'Panel de administración', 'CRUD de registros', 'Base de datos'].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
              >
                <Check className="h-3 w-3" />
                {item}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {APP_FUNCTIONS.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            active={!!selection[option.id]}
            onToggle={() => onToggle(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Paso 3: Imagen y estilo ──────────────────────────────────

export function StepStyle({
  value,
  onChange,
}: {
  value: StyleForm
  onChange: (patch: Partial<StyleForm>) => void
}) {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-300">¿Contás con un logo?</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {LOGO_CHOICES.map((choice) => (
            <RadioCard
              key={choice.id}
              selected={value.logo === choice.id}
              onClick={() => onChange({ logo: choice.id })}
              title={choice.label}
              hint={choice.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-300">¿Tenés identidad de marca definida?</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {IDENTITY_CHOICES.map((choice) => (
            <RadioCard
              key={choice.id}
              selected={value.identity === choice.id}
              onClick={() => onChange({ identity: choice.id })}
              title={choice.label}
              hint={choice.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-300">¿Qué estilo visual te gusta?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {STYLE_PREFS.map((style) => (
            <RadioCard
              key={style.id}
              selected={value.stylePref === style.id}
              onClick={() => onChange({ stylePref: style.id })}
              title={style.label}
              hint={style.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-300">¿Contás con fotografías?</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PHOTO_CHOICES.map((choice) => (
            <RadioCard
              key={choice.id}
              selected={value.photos === choice.id}
              onClick={() => onChange({ photos: choice.id })}
              title={choice.label}
              hint=""
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Paso 4: Operación y continuidad ──────────────────────────

export function StepOperation({
  selection,
  onToggle,
}: {
  selection: QuoteSelection
  onToggle: (optionId: string) => void
}) {
  return (
    <div>
      <p className="text-sm text-zinc-400">
        Servicios para que tu proyecto siga funcionando y mejorando después del lanzamiento.
      </p>
      <div className="mt-6 space-y-3">
        {OPERATION_OPTIONS.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            active={!!selection[option.id]}
            onToggle={() => onToggle(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Paso 5: Detalles del proyecto ────────────────────────────

export function StepDetails({
  value,
  onChange,
}: {
  value: DetailsForm & { timeline: TimelineId }
  onChange: (patch: Partial<DetailsForm & { timeline: TimelineId }>) => void
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-sector" className="mb-2 block text-sm font-medium text-zinc-300">
            Rubro de tu negocio
          </label>
          <select
            id="q-sector"
            value={value.sector}
            onChange={(e) => onChange({ sector: e.target.value })}
            className="field appearance-none bg-[#0b0d17] [&>option]:bg-[#0b0d17]"
          >
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-budget" className="mb-2 block text-sm font-medium text-zinc-300">
            Presupuesto que manejás
          </label>
          <select
            id="q-budget"
            value={value.budget}
            onChange={(e) => onChange({ budget: e.target.value })}
            className="field appearance-none bg-[#0b0d17] [&>option]:bg-[#0b0d17]"
          >
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-300">¿Qué tan urgente es?</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIMELINES.map((t) => {
            const selected = value.timeline === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ timeline: t.id })}
                aria-pressed={selected}
                className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                  selected
                    ? 'border-indigo-400/60 bg-indigo-500/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">{t.label}</span>
                  {t.multiplier > 1 && (
                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      +{Math.round((t.multiplier - 1) * 100)}%
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{t.hint}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="q-references" className="mb-2 block text-sm font-medium text-zinc-300">
          Sitios o apps de referencia <span className="text-zinc-600">(opcional)</span>
        </label>
        <input
          id="q-references"
          type="text"
          value={value.references}
          onChange={(e) => onChange({ references: e.target.value })}
          placeholder="Ej: www.sitiodecompetencia.com, www.estiloquemegusta.com"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="q-description" className="mb-2 block text-sm font-medium text-zinc-300">
          Contame sobre tu proyecto <span className="text-red-400">*</span>
        </label>
        <textarea
          id="q-description"
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
          required
          rows={4}
          placeholder="Qué hacés hoy, qué querés lograr, qué problema te gustaría resolver..."
          className="field resize-none"
        />
      </div>
    </div>
  )
}

// ── Paso 6: Datos de contacto ────────────────────────────────

export function StepContact({
  value,
  onChange,
}: {
  value: ContactForm
  onChange: (patch: Partial<ContactForm>) => void
}) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="mb-2 block text-sm font-medium text-zinc-300">
            Nombre <span className="text-red-400">*</span>
          </label>
          <input
            id="q-name"
            type="text"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            placeholder="Tu nombre"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="q-email" className="mb-2 block text-sm font-medium text-zinc-300">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="q-email"
            type="email"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            required
            placeholder="tu@email.com"
            className="field"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-phone" className="mb-2 block text-sm font-medium text-zinc-300">
            WhatsApp <span className="text-zinc-600">(opcional)</span>
          </label>
          <input
            id="q-phone"
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+54 9 11 0000 0000"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="q-company" className="mb-2 block text-sm font-medium text-zinc-300">
            Empresa <span className="text-zinc-600">(opcional)</span>
          </label>
          <input
            id="q-company"
            type="text"
            value={value.company}
            onChange={(e) => onChange({ company: e.target.value })}
            placeholder="Nombre de tu negocio"
            className="field"
          />
        </div>
      </div>
      <p className="text-xs leading-relaxed text-zinc-600">
        Al enviar aceptás que use tus datos únicamente para responderte sobre este proyecto. Nada
        de spam.
      </p>
    </div>
  )
}
