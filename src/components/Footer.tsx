import Logo from './Logo'
import { Github, Linkedin, Mail, Whatsapp } from './icons'

const socials = [
  { label: 'GitHub', href: 'https://github.com/Aguus1610', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/agustin-deux-dev/', icon: Linkedin },
  { label: 'WhatsApp', href: 'https://wa.me/5492302672827', icon: Whatsapp },
  { label: 'Email', href: 'mailto:adevsoft2026@gmail.com', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05060b]">
      <div className="container-x flex flex-col items-center justify-between gap-8 py-12 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Logo />
          <p className="max-w-xs text-center text-sm leading-relaxed text-zinc-500 md:text-left">
            Soluciones web a medida para PyMEs. Diseño, desarrollo y automatizaciones que hacen
            crecer tu negocio.
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:text-white"
              >
                <social.icon className="h-4.5 w-4.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} A-Dev. Todos los derechos reservados.</p>
          <p>
            Hecho con <span className="text-indigo-400">React</span> +{' '}
            <span className="text-cyan-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
