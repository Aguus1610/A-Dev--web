import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  sub?: string
  align?: 'center' | 'left'
}

export default function SectionHeader({ eyebrow, title, sub, align = 'center' }: SectionHeaderProps) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
        {eyebrow}
      </p>
      <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">{sub}</p>}
    </Reveal>
  )
}
