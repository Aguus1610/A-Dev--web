import { LogoMark } from './Logo'

export default function LogoBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/25 blur-[100px]" />
        <LogoMark className="relative h-[78vmin] w-[78vmin] opacity-[0.16]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent_30%,#07080f_100%)]" />
    </div>
  )
}
