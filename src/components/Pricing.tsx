import Reveal from './Reveal'
import SectionHeader from './Section'
import { ArrowRight, Check } from './icons'

const plans = [
  {
    projectType: 'Sitio web',
    name: 'Web básica',
    price: 'USD 50–200',
    description: 'Presencia digital simple y efectiva para empezar a vender.',
    features: [
      '1 página + contacto',
      'Diseño responsive',
      'Integración de WhatsApp',
      'Entrega en pocos días',
    ],
    featured: false,
  },
  {
    projectType: 'Web profesional',
    name: 'Web profesional',
    price: 'USD 300–500',
    description: 'El sitio completo que tu negocio necesita para destacar.',
    features: [
      'Hasta 5 secciones a medida',
      'Diseño premium personalizado',
      'SEO básico',
      'Integración Google Maps',
      'Formularios avanzados',
    ],
    featured: true,
  },
  {
    projectType: 'Mini-app',
    name: 'Mini-app',
    price: 'USD 700–900',
    description: 'Aplicación web con panel de gestión para digitalizar tu operación.',
    features: [
      'Autenticación de usuarios',
      'CRUD de registros y reportes',
      'Base Supabase / PostgreSQL',
      'Despliegue en producción',
      'Soporte prioritario',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="precios" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Precios"
          title={
            <>
              Planes claros, <span className="text-gradient">sin sorpresas</span>
            </>
          }
          sub="Precios de referencia en USD. Cada proyecto es distinto: te confirmo el valor exacto en la propuesta."
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120} className="h-full">
              {plan.featured ? (
                <div className="h-full rounded-3xl bg-gradient-to-b from-indigo-400/60 via-violet-500/40 to-cyan-400/50 p-[1px] shadow-[0_0_70px_-18px_rgba(139,92,246,0.55)]">
                  <article className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0b0d17] p-7">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                      ★ Más elegido
                    </span>
                    <PlanContent plan={plan} />
                  </article>
                </div>
              ) : (
                <article className="card-glass relative h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
                  <PlanContent plan={plan} />
                </article>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            ¿No encaja en ningún paquete?{' '}
            <a href="#contacto" className="font-medium text-indigo-300 transition-colors hover:text-indigo-200">
              Te armo una propuesta a medida →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

type Plan = (typeof plans)[number]

function PlanContent({ plan }: { plan: Plan }) {
  return (
    <>
      <h3 className="font-display text-lg font-semibold text-white">{plan.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{plan.description}</p>
      <p className="font-display mt-6 text-3xl font-bold tracking-tight text-white">
        {plan.price}
      </p>
      <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent<{ projectType: string; message: string }>('adev:preselect-contact', {
              detail: {
                projectType: plan.projectType,
                message: [
                  `Hola Agustín, me interesa el plan "${plan.name}" (${plan.price}).`,
                  '',
                  'Lo que incluye:',
                  ...plan.features.map((f) => `- ${f}`),
                  '',
                  'Quiero avanzar con una cotización. Contame cómo seguimos.',
                ].join('\n'),
              },
            }),
          )
        }
        className={`${plan.featured ? 'btn-primary' : 'btn-ghost'} mt-8 w-full`}
      >
        Cotizar este plan
        <ArrowRight className="h-4 w-4" />
      </a>
    </>
  )
}
