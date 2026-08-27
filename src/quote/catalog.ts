export type ProjectType = 'web' | 'app'

export type PriceRange = { min: number; max: number }

export type ProjectBase = {
  id: ProjectType
  name: string
  tagline: string
  chip?: string
  base: PriceRange
  included: string[]
}

export type QuoteOption = {
  id: string
  label: string
  description: string
  price: PriceRange
  monthly?: boolean
}

export type ChoiceOption = {
  id: string
  label: string
  description: string
  price: PriceRange
}

export type CustomPage = { id: number; name: string; description: string }

export const STANDARD_PRICE = 100

export const PROJECT_TYPES: ProjectBase[] = [
  {
    id: 'web',
    name: 'Web de comunicación / publicitaria',
    tagline: 'Un sitio para mostrar tu negocio, tus productos y conseguir clientes.',
    chip: 'Lo más común',
    base: { min: 50, max: 200 },
    included: ['Diseño responsive', 'Integración de WhatsApp'],
  },
  {
    id: 'app',
    name: 'App web / sistema de gestión',
    tagline: 'Una aplicación con login y panel para digitalizar la operación de tu negocio.',
    chip: 'Sistema completo',
    base: { min: 700, max: 900 },
    included: [
      'Login de usuarios y roles',
      'Panel de administración',
      'CRUD de registros',
      'Base Supabase / PostgreSQL',
      'Despliegue en producción',
    ],
  },
]

export const WEB_SECTIONS: QuoteOption[] = [
  {
    id: 'principal',
    label: 'Página principal (Inicio)',
    description: 'La portada de tu web: primera impresión y presentación de tu negocio.',
    price: { min: 40, max: 80 },
  },
  {
    id: 'contacto',
    label: 'Página de contacto',
    description: 'Datos de contacto, ubicación y formulario para que te escriban.',
    price: { min: 30, max: 50 },
  },
  {
    id: 'nosotros',
    label: 'Nuestra empresa / Quiénes somos',
    description: 'Página para contar tu historia, equipo y valores.',
    price: { min: 60, max: 120 },
  },
  {
    id: 'productos',
    label: 'Productos / Servicios',
    description: 'Página con lo que vendés u ofrecés, con fotos y detalles.',
    price: { min: 80, max: 150 },
  },
  {
    id: 'testimonios',
    label: 'Testimonios / Casos reales',
    description: 'Opiniones de clientes y trabajos que generan confianza.',
    price: { min: 40, max: 80 },
  },
]

export const CUSTOM_PAGE_PRICE: PriceRange = { min: 60, max: 120 }

export const APP_FUNCTIONS: QuoteOption[] = [
  {
    id: 'importacion',
    label: 'Carga masiva / importación Excel',
    description: 'Subí registros desde planillas sin cargar uno por uno.',
    price: { min: 150, max: 300 },
  },
  {
    id: 'reportes',
    label: 'Reportes y exportación',
    description: 'Informes de datos y exportación a Excel/PDF.',
    price: { min: 150, max: 300 },
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones automáticas',
    description: 'Avisos por email o WhatsApp (pedidos, recordatorios, alertas).',
    price: { min: 100, max: 250 },
  },
  {
    id: 'agenda',
    label: 'Agenda / calendario',
    description: 'Turnos, citas o calendario de trabajo dentro de la app.',
    price: { min: 150, max: 300 },
  },
  {
    id: 'facturacion',
    label: 'Presupuestos / facturación simple',
    description: 'Generá presupuestos y facturas básicas desde el sistema.',
    price: { min: 200, max: 400 },
  },
  {
    id: 'integraciones',
    label: 'Integraciones con APIs externas',
    description: 'Conectar con planillas, facturación, calendarios u otras herramientas.',
    price: { min: 150, max: 350 },
  },
]

export const OPERATION_OPTIONS: QuoteOption[] = [
  {
    id: 'dominio-hosting',
    label: 'Dominio + hosting (anual)',
    description: 'Registro de dominio y servidor por un año, gestionado por mí.',
    price: { min: 60, max: 120 },
  },
  {
    id: 'mantenimiento',
    label: 'Mantenimiento mensual',
    description: 'Actualizaciones, backups y soporte técnico todos los meses.',
    price: { min: 30, max: 80 },
    monthly: true,
  },
  {
    id: 'soporte-prioritario',
    label: 'Soporte prioritario',
    description: 'Respuestas más rápidas y canal directo durante 6 meses.',
    price: { min: 50, max: 100 },
  },
  {
    id: 'guia-uso',
    label: 'Guía de uso / capacitación',
    description: 'Te enseño a usar y administrar tu web o sistema.',
    price: { min: 40, max: 80 },
  },
]

export const LOGO_CHOICES: ChoiceOption[] = [
  {
    id: 'tengo',
    label: 'Ya tengo logo',
    description: 'Me lo pasás en buena calidad y lo usamos.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'necesito',
    label: 'Necesito que me lo hagan',
    description: 'Diseño de logo simple incluido en el proyecto.',
    price: { min: 80, max: 150 },
  },
  {
    id: 'digitalizar',
    label: 'Tengo idea, falta pulirla',
    description: 'A partir de tu boceto o idea, lo armamos digital.',
    price: { min: 40, max: 80 },
  },
  {
    id: 'definir',
    label: 'A definir',
    description: 'Lo resolvemos en la propuesta con un precio estándar.',
    price: { min: STANDARD_PRICE, max: STANDARD_PRICE },
  },
]

export const IDENTITY_CHOICES: ChoiceOption[] = [
  {
    id: 'si',
    label: 'Sí, definida',
    description: 'Colores y estilo ya establecidos.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'parcial',
    label: 'Más o menos',
    description: 'Hay que ajustarla para que luzca profesional.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'desde-cero',
    label: 'Desde cero',
    description: 'Definimos paleta de colores y estilo juntos.',
    price: { min: 50, max: 100 },
  },
  {
    id: 'definir',
    label: 'A definir',
    description: 'Lo resolvemos en la propuesta con un precio estándar.',
    price: { min: STANDARD_PRICE, max: STANDARD_PRICE },
  },
]

export const STYLE_PREFS: ChoiceOption[] = [
  {
    id: 'moderno',
    label: 'Moderno y minimalista',
    description: 'Espacios limpios, tipografía elegante, pocos elementos.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'corporativo',
    label: 'Corporativo y serio',
    description: 'Transmite confianza y solidez para empresas.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'creativo',
    label: 'Creativo y llamativo',
    description: 'Colores fuertes y un diseño que impacta.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'premium',
    label: 'Premium y elegante',
    description: 'Detalles finos, animaciones sutiles, look exclusivo.',
    price: { min: 0, max: 0 },
  },
  {
    id: 'definir',
    label: 'A definir',
    description: 'Lo resolvemos en la propuesta con un precio estándar.',
    price: { min: STANDARD_PRICE, max: STANDARD_PRICE },
  },
]

export const PHOTO_CHOICES: ChoiceOption[] = [
  { id: 'propias', label: 'Tengo fotos propias', description: '', price: { min: 0, max: 0 } },
  { id: 'banco', label: 'Usar banco de imágenes gratuitas', description: '', price: { min: 0, max: 0 } },
  { id: 'ayuda', label: 'Necesito ayuda con las fotos', description: '', price: { min: 0, max: 0 } },
  {
    id: 'definir',
    label: 'A definir',
    description: 'Lo resolvemos en la propuesta con un precio estándar.',
    price: { min: STANDARD_PRICE, max: STANDARD_PRICE },
  },
]

export type TimelineId = 'normal' | 'rapido' | 'express'

export type Timeline = {
  id: TimelineId
  label: string
  hint: string
  multiplier: number
}

export const TIMELINES: Timeline[] = [
  { id: 'normal', label: 'Sin apuro', hint: 'Entrega estándar según el alcance', multiplier: 1 },
  { id: 'rapido', label: 'Prioridad', hint: 'Empiezo antes y priorizo tu proyecto (+10%)', multiplier: 1.1 },
  { id: 'express', label: 'Express', hint: 'Dedicación intensiva para entrega urgente (+20%)', multiplier: 1.2 },
]

export type QuoteSelection = Record<string, boolean>

export type QuoteEstimate = {
  oneTime: PriceRange
  monthly: PriceRange | null
  items: Array<{ id: string; label: string; price: PriceRange; monthly?: boolean }>
}

export type QuoteState = {
  projectId: ProjectType
  selection: QuoteSelection
  customPages: CustomPage[]
  logo: string
  identity: string
  stylePref: string
  photos: string
  timeline: TimelineId
}

const round5 = (n: number) => Math.round(n / 5) * 5

export function computeQuote(state: QuoteState): QuoteEstimate {
  const project = PROJECT_TYPES.find((p) => p.id === state.projectId) ?? PROJECT_TYPES[0]
  const multiplier = TIMELINES.find((t) => t.id === state.timeline)?.multiplier ?? 1

  const items: QuoteEstimate['items'] = []
  let oneMin = project.base.min
  let oneMax = project.base.max
  let monthMin = 0
  let monthMax = 0
  let hasMonthly = false

  const addItem = (opt: QuoteOption) => {
    items.push({ id: opt.id, label: opt.label, price: opt.price, monthly: opt.monthly })
    if (opt.monthly) {
      monthMin += opt.price.min
      monthMax += opt.price.max
      hasMonthly = true
    } else {
      oneMin += opt.price.min
      oneMax += opt.price.max
    }
  }

  const structureOptions =
    state.projectId === 'web' ? WEB_SECTIONS : state.projectId === 'app' ? APP_FUNCTIONS : []
  for (const opt of structureOptions) {
    if (state.selection[opt.id]) addItem(opt)
  }

  for (const page of state.customPages) {
    if (page.name.trim()) {
      items.push({
        id: `custom-${page.id}`,
        label: `Página personalizada: ${page.name.trim()}`,
        price: CUSTOM_PAGE_PRICE,
      })
      oneMin += CUSTOM_PAGE_PRICE.min
      oneMax += CUSTOM_PAGE_PRICE.max
    }
  }

  const logoChoice = LOGO_CHOICES.find((l) => l.id === state.logo)
  if (logoChoice && logoChoice.price.min > 0) {
    items.push({ id: 'logo', label: `Logo: ${logoChoice.label}`, price: logoChoice.price })
    oneMin += logoChoice.price.min
    oneMax += logoChoice.price.max
  }

  const identityChoice = IDENTITY_CHOICES.find((i) => i.id === state.identity)
  if (identityChoice && identityChoice.price.min > 0) {
    items.push({ id: 'identidad', label: `Identidad: ${identityChoice.label}`, price: identityChoice.price })
    oneMin += identityChoice.price.min
    oneMax += identityChoice.price.max
  }

  const styleChoice = STYLE_PREFS.find((s) => s.id === state.stylePref)
  if (styleChoice && styleChoice.price.min > 0) {
    items.push({ id: 'estilo', label: `Estilo: ${styleChoice.label}`, price: styleChoice.price })
    oneMin += styleChoice.price.min
    oneMax += styleChoice.price.max
  }

  const photoChoice = PHOTO_CHOICES.find((p) => p.id === state.photos)
  if (photoChoice && photoChoice.price.min > 0) {
    items.push({ id: 'fotos', label: `Fotos: ${photoChoice.label}`, price: photoChoice.price })
    oneMin += photoChoice.price.min
    oneMax += photoChoice.price.max
  }

  for (const opt of OPERATION_OPTIONS) {
    if (state.selection[opt.id]) addItem(opt)
  }

  return {
    oneTime: { min: round5(oneMin * multiplier), max: round5(oneMax * multiplier) },
    monthly: hasMonthly ? { min: round5(monthMin), max: round5(monthMax) } : null,
    items,
  }
}

export const SECTORS = [
  'Comercio / Retail',
  'Taller / Industria',
  'Servicios profesionales',
  'Gastronomía',
  'Salud',
  'Construcción',
  'Educación',
  'Turismo',
  'Otro',
]

export const BUDGET_OPTIONS = [
  'Menos de USD 200',
  'USD 200–500',
  'USD 500–1.000',
  'USD 1.000–2.000',
  'Más de USD 2.000',
  'Aún no lo definí',
]

export const PRICE = 'USD'

export const formatRange = (r: PriceRange) =>
  r.min === r.max
    ? `${PRICE} ${r.min.toLocaleString('es-AR')}`
    : `${PRICE} ${r.min.toLocaleString('es-AR')}–${r.max.toLocaleString('es-AR')}`
