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
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="A-Dev — volver al inicio">
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight text-white">
        A-<span className="text-gradient">Dev</span>
      </span>
    </a>
  )
}
