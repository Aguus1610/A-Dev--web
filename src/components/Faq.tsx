import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeader from './Section'
import { ChevronDown } from './icons'

const faqs = [
  {
    question: '¿Cuánto tarda mi proyecto?',
    answer:
      'Una web básica se entrega en pocos días. Una web profesional o mini-app suele tomar entre 2 y 6 semanas según el alcance. El plazo exacto queda definido en la propuesta, antes de arrancar.',
  },
  {
    question: '¿Qué necesito para empezar?',
    answer:
      'Solo tu idea y 30 minutos para una llamada. Del resto me encargo yo: diseño, desarrollo, dominio, hosting y puesta en marcha.',
  },
  {
    question: '¿El precio incluye dominio y hosting?',
    answer:
      'El desarrollo incluye el despliegue inicial. El dominio y el hosting tienen un costo anual aparte (aprox. USD 20–60). Podés gestionarlo vos o lo administro por vos.',
  },
  {
    question: '¿Puedo pedir cambios después del lanzamiento?',
    answer:
      'Sí. Todo proyecto incluye un período de ajustes sin cargo después de la entrega. Luego podés contratar soporte mensual o paquetes de mejoras puntuales.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      '50% al iniciar y 50% al entregar. Para mini-apps, en 3 hitos. Acepto transferencia bancaria, PayPal y criptomonedas.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-t border-white/5 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Preguntas <span className="text-gradient">frecuentes</span>
            </>
          }
          sub="Si tenés otra duda, escribime y te respondo en menos de 24 horas."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3 md:mt-16">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <Reveal key={faq.question} delay={i * 80}>
                <div
                  className={`card-glass overflow-hidden transition-colors duration-300 ${
                    open ? 'border-indigo-400/30 bg-white/[0.06]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
                        open ? 'rotate-180 text-indigo-300' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
