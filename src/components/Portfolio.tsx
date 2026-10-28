import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeader from './Section'
import { ArrowRight, ChevronLeft, ChevronRight } from './icons'

const projects = [
  {
    name: 'EAD Web',
    type: 'Sitio web',
    description:
      'Web de EAD Oleohidráulica: soluciones oleohidráulicas profesionales. Reparación, instalación y mantenimiento de sistemas hidráulicos, con más de 15 años de trayectoria.',
    tags: ['React', 'Tailwind CSS', 'SEO', 'WhatsApp'],
    url: 'https://aguus1610.github.io/EAD-web-nuevo/',
    cta: 'Visitar sitio',
    shots: ['shots/ead-web.jpg'],
  },
  {
    name: 'EAD Oleohidráulica Suite',
    type: 'App web',
    description:
      'Sistema de gestión del taller: presupuestos, registros y operación diaria digitalizada en una sola aplicación.',
    tags: ['Base44', 'Deno', 'Gestión de taller'],
    url: 'https://share--ead-oleohidraulica-2026-.base44.app',
    cta: 'Ver demo',
    shots: ['shots/ead-suite-1.jpg', 'shots/ead-suite-2.jpg'],
  },
  {
    name: 'Soft Price Flow Direct',
    type: 'App web',
    description:
      'Aplicación de gestión comercial para precios y presupuestos, con flujo de trabajo directo.',
    tags: ['Base44', 'Gestión comercial'],
    url: 'https://share--soft-price-flow-direct.base44.app',
    cta: 'Ver demo',
    shots: ['shots/soft-price-1.jpg', 'shots/soft-price-2.jpg', 'shots/soft-price-3.jpg'],
  },
]

function Gallery({ shots, name, type }: { shots: string[]; name: string; type: string }) {
  const [index, setIndex] = useState(0)
  const total = shots.length

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <div className="group/gallery relative aspect-[16/10] overflow-hidden border-b border-white/5">
      <img
        src={`${import.meta.env.BASE_URL}${shots[index]}`}
        alt={`Captura ${index + 1} de ${name}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent opacity-70"
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={`Captura anterior de ${name}`}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0c14]/70 text-zinc-300 opacity-0 backdrop-blur transition-all duration-300 hover:bg-[#0a0c14]/90 hover:text-white group-hover/gallery:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={`Siguiente captura de ${name}`}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0c14]/70 text-zinc-300 opacity-0 backdrop-blur transition-all duration-300 hover:bg-[#0a0c14]/90 hover:text-white group-hover/gallery:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {shots.map((shot, i) => (
              <button
                key={shot}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver captura ${i + 1} de ${name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#0a0c14]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur">
        {type}
      </span>
      <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-[#0a0c14]/80 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        En producción · +1 año
      </span>
    </div>
  )
}

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
          sub="Trabajos reales funcionando para clientes reales desde hace más de un año. Pasá el mouse sobre las capturas para recorrerlas y tocá cada proyecto para verlo en vivo."
        />

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 120} className="h-full">
              <article className="card-glass group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-indigo-950/40">
                <Gallery shots={project.shots} name={project.name} type={project.type} />

                <div className="relative flex flex-1 flex-col p-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <h3 className="font-display relative text-lg font-semibold text-white">
                    {project.name}
                  </h3>
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
