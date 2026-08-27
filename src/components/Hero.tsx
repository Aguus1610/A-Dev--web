import { ArrowRight, Check } from './icons'
import TechCarousel from './TechCarousel'

function Terminal() {
  return (
    <div className="relative mx-auto mt-16 max-w-3xl animate-fade-up-delay-5 md:mt-20">
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-10 -bottom-16 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-cyan-500/20 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17]/90 shadow-2xl shadow-indigo-950/50 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-zinc-500">a-dev — terminal</span>
        </div>
        <div className="px-5 py-6 font-mono text-[13px] leading-7 sm:px-7 sm:text-sm">
          <p>
            <span className="text-emerald-400">$</span>{' '}
            <span className="text-zinc-200">a-dev nuevo-proyecto "MiPyME"</span>
          </p>
          <p className="mt-2 text-zinc-400">
            <span className="text-emerald-400">✓</span> Analizando requerimientos...
          </p>
          <p className="text-zinc-400">
            <span className="text-emerald-400">✓</span> Diseñando interfaz y experiencia
          </p>
          <p className="text-zinc-400">
            <span className="text-emerald-400">✓</span> Desarrollando con{' '}
            <span className="text-cyan-300">React + TypeScript</span>
          </p>
          <p className="text-zinc-400">
            <span className="text-emerald-400">✓</span> Optimizando rendimiento y SEO
          </p>
          <p className="mt-2 flex items-center gap-2 text-emerald-400">
            <span>▸</span>
            <span className="text-zinc-200">Proyecto en producción</span>
            <span className="animate-blink ml-1 inline-block h-4 w-2 bg-emerald-400" />
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="card-glass animate-float absolute -right-8 top-14 hidden rotate-2 px-4 py-2.5 lg:block"
      >
        <span className="text-xs font-medium text-zinc-300">⚛ React 19 · TypeScript</span>
      </div>
      <div
        aria-hidden="true"
        className="card-glass animate-float-slow absolute -left-10 bottom-10 hidden -rotate-2 px-4 py-2.5 lg:block"
      >
        <span className="text-xs font-medium text-zinc-300">🗄 Supabase · PostgreSQL</span>
      </div>
      <div
        aria-hidden="true"
        className="card-glass animate-float absolute -right-4 -bottom-8 hidden rotate-1 px-4 py-2.5 lg:block [animation-delay:1.5s]"
      >
        <span className="text-xs font-medium text-zinc-300">⚡ Tailwind CSS v4</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="absolute -top-56 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[140px]" />
        <div className="animate-float-slow absolute -right-32 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="animate-float absolute -left-36 top-80 h-80 w-80 rounded-full bg-violet-600/15 blur-[110px] [animation-delay:2s]" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#cotizar"
            className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur transition-colors hover:border-emerald-400/30 hover:bg-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible para nuevos proyectos
          </a>

          <h1 className="font-display animate-fade-up-delay-1 mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
            Webs y aplicaciones que <span className="text-gradient">hacen crecer</span> tu negocio
          </h1>

          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Soy Agustín, desarrollador full-stack. Diseño y construyo sitios web, aplicaciones y
            automatizaciones a medida para PyMEs que quieren verse profesionales, ahorrar tiempo y
            vender más.
          </p>

          <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#cotizar" className="btn-primary">
              Cotizar mi proyecto
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#servicios" className="btn-ghost">
              Ver servicios
            </a>
          </div>

          <ul className="animate-fade-up-delay-4 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Respuesta en menos de 24 h
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Sin costos ocultos
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Soporte post-lanzamiento
            </li>
          </ul>
        </div>

        <Terminal />

        <TechCarousel />
      </div>
    </section>
  )
}
