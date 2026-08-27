import Reveal from './Reveal'
import SectionHeader from './Section'
import { Check, Database, Globe, ShieldCheck, Zap } from './icons'

const services = [
  {
    icon: Globe,
    title: 'Sitios web profesionales',
    description:
      'Landings, portfolios y sitios corporativos diseñados a medida que transmiten confianza desde el primer segundo.',
    features: ['Diseño 100% a medida', 'Optimizado para celular y SEO', 'WhatsApp y formularios integrados'],
  },
  {
    icon: Database,
    title: 'Aplicaciones web y mini-apps',
    description:
      'Paneles de gestión con login, base de datos y reportes para digitalizar los procesos de tu negocio.',
    features: ['Autenticación de usuarios', 'CRUD, reportes y dashboards', 'Base Supabase / PostgreSQL'],
  },
  {
    icon: Zap,
    title: 'Automatizaciones e integraciones',
    description:
      'Conecto tus herramientas y elimino tareas repetitivas: emails, WhatsApp, planillas, APIs y más.',
    features: ['Formularios y notificaciones automáticas', 'Integración con tus sistemas', 'Menos trabajo manual'],
  },
  {
    icon: ShieldCheck,
    title: 'Mantenimiento y soporte',
    description:
      'Tu web siempre actualizada, segura y mejorando: backups, monitoreo y nuevas funciones cuando las necesites.',
    features: ['Actualizaciones y backups', 'Monitoreo de seguridad', 'Mejoras continuas'],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Servicios"
          title={
            <>
              Todo lo que tu negocio necesita <span className="text-gradient">para crecer</span>
            </>
          }
          sub="Desde tu primera página web hasta una aplicación completa para digitalizar tu operación. Cada proyecto se construye a medida, sin plantillas genéricas."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <article className="card-glass group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-indigo-950/40">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 p-3 text-indigo-300 transition-colors duration-300 group-hover:text-cyan-300">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
