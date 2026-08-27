import type { ReactNode } from 'react'

type StackSectionProps = {
  index: number
  children: ReactNode
  className?: string
}

export default function StackSection({ index, children, className = '' }: StackSectionProps) {
  const stacked = index > 0

  return (
    <div
      className={`relative ${
        stacked
          ? '-mt-8 overflow-hidden rounded-t-3xl border-x border-t border-white/10 bg-[#080a12]/[0.87] shadow-[0_-45px_90px_-35px_rgba(0,0,0,0.9)] backdrop-blur-[2px] sm:-mt-12 md:-mt-16 md:rounded-t-[2.5rem]'
          : ''
      } ${className}`}
      style={stacked ? { zIndex: index } : undefined}
    >
      {children}
    </div>
  )
}
