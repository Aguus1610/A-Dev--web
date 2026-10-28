import Reveal from './Reveal'
import SectionHeader from './Section'
import { ArrowRight, Database, Monitor } from './icons'

const projects = [
  {
    name: 'EAD Web',
    type: 'Sitio web',
    description:
      'Web de EAD Oleohidráulica: soluciones oleohidráulicas profesionales. Reparación, instalación y mantenimiento de sistemas hidráulicos, con más de 15 años de trayectoria.',
    tags: ['React', 'Tailwind CSS', 'SEO', 'WhatsApp'],
    url: 'https://aguus1610.github.io/EAD-web-nuevo/',
    cta: 'Visitar sitio',
    icon: Monitor,
  },
  {
    name: 'EAD Oleohidráulica Suite',
    type: 'App web',
    description:
      'Sistema de gestión del taller: presupuestos, registros y operación diaria digitalizada en una sola aplicación.',
    tags: ['Base44', 'Deno', 'Gestión de taller'],
    url: 'https://share--ead-oleohidraulica-2026-.base44.app',
    cta: 'Ver demo',
    icon: Database,
  },
  {
    name: 'Soft Price Flow Direct',
    type: 'App web',
    description:
      'Aplicación de gestión comercial para precios y presupuestos, con flujo de trabajo directo.',
    tags: ['Base44', 'Gestión comercial'],
    url: 'https://share--soft-price-flow-direct.base44.app',
    cta: 'Ver demo',
    icon: Database,
  },
]

export default function Portfolio() {
  return (
    <section id="proyectos" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Proyectos en <span className="text-gradient">producción</span>
            </>
          }
          sub="Trabajos reales funcionando para clientes reales desde hace más de un año. Tocá cada uno para verlo en vivo."
        />

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 120} className="h-full">
              <article className="card-glass group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-indigo-950/40">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="inline-flex rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 p-3 text-indigo-300 transition-colors duration-300 group-hover:text-cyan-300">
                    <project.icon className="h-6 w-6" />
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    En producción · +1 año
                  </span>
                </div>

                <h3 className="font-display relative mt-5 text-lg font-semibold text-white">
                  {project.name}
                </h3>
                <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {project.type}
                </p>
                <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
                >
                  {project.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
