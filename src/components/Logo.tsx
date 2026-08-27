export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt=""
      draggable={false}
      className={`${className} select-none object-contain`}
    />
  )
}

export default function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="A-Dev — volver al inicio">
      <LogoMark className="h-11 w-11 drop-shadow-[0_0_18px_rgba(129,140,248,0.45)] md:h-12 md:w-12" />
      <span className="font-display text-2xl font-bold tracking-tight text-white md:text-[1.65rem]">
        A-<span className="text-gradient">Dev</span>
      </span>
    </a>
  )
}
