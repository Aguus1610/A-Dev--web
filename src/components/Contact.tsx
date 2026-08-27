import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Reveal from './Reveal'
import SectionHeader from './Section'
import { Check, Clock, Mail, Send, Whatsapp } from './icons'

const projectTypes = ['Sitio web', 'Web profesional', 'Mini-app', 'Automatización', 'Otra consulta']

type Status = 'idle' | 'sending' | 'success' | 'error'

type PreselectContactDetail = { projectType?: string; message: string }

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState(projectTypes[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const handler = (e: Event) => {
      const { projectType: type, message: preset } = (e as CustomEvent<PreselectContactDetail>).detail
      if (type && projectTypes.includes(type)) setProjectType(type)
      if (preset) setMessage(preset)
      setStatus('idle')
    }
    window.addEventListener('adev:preselect-contact', handler)
    return () => window.removeEventListener('adev:preselect-contact', handler)
  }, [])

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      const emailjs = await import('@emailjs/browser')
      emailjs.init({ publicKey: 'SHCCKv__9-9XVNQDv' })

      await emailjs.send('service_oh4erk7', 'template_ke1v1qj', {
        from_name: name,
        from_email: email,
        project_type: projectType,
        message,
        time: new Date().toLocaleString('es-AR'),
        page_url: window.location.href,
        source: 'Formulario de contacto',
        site_name: 'A-Dev',
        site_url: window.location.origin,
        to_email: 'adevsoft2026@gmail.com',
        subject: 'Nueva consulta desde la landing A-Dev',
      })

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      window.setTimeout(() => setStatus('idle'), 6000)
    } catch (error) {
      console.error('Error al enviar el email', error)
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
        <div className="absolute -bottom-40 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Contacto"
          title={
            <>
              ¿Hablamos de <span className="text-gradient">tu proyecto?</span>
            </>
          }
          sub="Contame qué necesitás y te respondo en menos de 24 horas con una propuesta personalizada, sin compromiso."
        />

        <Reveal delay={100} className="mt-8 text-center">
          <a
            href="#cotizar"
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-5 py-2.5 text-sm text-indigo-200 transition-colors hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-indigo-100"
          >
            ¿Preferís armarlo paso a paso y ver precios al instante?
            <span className="font-semibold">Ir al cotizador interactivo →</span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="card-glass flex items-center gap-4 p-5 transition-colors duration-300 hover:border-indigo-400/30">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 text-indigo-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Email</p>
                  <a
                    href="mailto:adevsoft2026@gmail.com"
                    className="font-medium text-white transition-colors hover:text-indigo-300"
                  >
                    adevsoft2026@gmail.com
                  </a>
                </div>
              </div>

              <div className="card-glass flex items-center gap-4 p-5 transition-colors duration-300 hover:border-emerald-400/30">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 text-emerald-300">
                  <Whatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">WhatsApp</p>
                  <a
                    href="https://wa.me/5492302672827?text=Hola%21%20Quiero%20cotizar%20un%20proyecto%20web"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white transition-colors hover:text-emerald-300"
                  >
                    Escribirme por WhatsApp
                  </a>
                </div>
              </div>

              <div className="card-glass flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Tiempo de respuesta</p>
                  <p className="font-medium text-white">Menos de 24 horas</p>
                </div>
              </div>

              <ul className="card-glass mt-2 space-y-3 p-5 text-sm text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  Propuesta sin cargo
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  Asesoramiento honesto: si no te conviene, te lo digo
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  Sin compromiso hasta que estés convencido
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={sendEmail}
              className="card-glass relative overflow-hidden p-6 sm:p-8"
              aria-label="Formulario de contacto"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="field"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="project-type" className="mb-2 block text-sm font-medium text-zinc-300">
                  Tipo de proyecto
                </label>
                <select
                  id="project-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="field appearance-none bg-[#0b0d17] [&>option]:bg-[#0b0d17]"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-300">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Contame sobre tu proyecto: qué querés lograr, plazos, referencias..."
                  className="field resize-none"
                />
              </div>

              {status === 'success' && (
                <div
                  role="status"
                  className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3.5 text-sm text-emerald-300"
                >
                  <Check className="h-5 w-5 shrink-0" />
                  ¡Gracias! Tu consulta fue enviada. Te contacto en menos de 24 horas.
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="mt-5 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-300"
                >
                  Hubo un error al enviar. Probá de nuevo o escribime directo a adevsoft2026@gmail.com
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full">
                {status === 'sending' ? (
                  <>
                    <span className="spinner h-4 w-4 rounded-full border-2 border-white/40 border-t-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar consulta
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-zinc-600">
                Tus datos solo se usan para responder tu consulta. Nada de spam.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
