import Reveal from './Reveal'
import SectionHeader from './Section'

const steps = [
  {
    title: 'Descubrimiento',
    description:
      'Hacemos una llamada sin cargo para entender tu negocio, tus objetivos y lo que realmente necesitás.',
  },
  {
    title: 'Propuesta',
    description: 'Recibís una propuesta clara con alcance, plazos y presupuesto. Sin letra chica.',
  },
  {
    title: 'Diseño y desarrollo',
    description: 'Trabajo iterativo: te muestro avances semana a semana y ajustamos sobre la marcha.',
  },
  {
    title: 'Lanzamiento y soporte',
    description: 'Publico tu proyecto, lo dejo andando en producción y te acompaño después del lanzamiento.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="relative border-y border-white/5 bg-white/[0.02] py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Proceso"
          title={
            <>
              De la idea a producción, <span className="text-gradient">en 4 pasos</span>
            </>
          }
          sub="Un proceso claro y sin sorpresas. Sabés en todo momento en qué etapa está tu proyecto."
        />

        <ol className="relative mt-14 grid gap-8 md:mt-16 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute inset-x-16 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 120} className="h-full">
              <li className="relative h-full">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/20 blur-md"
                  />
                  <span className="card-glass font-display relative flex h-12 w-12 items-center justify-center text-sm font-bold tracking-wide text-indigo-200">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
