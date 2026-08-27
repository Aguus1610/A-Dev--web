import { useEffect, useRef, useState } from 'react'
import type { ComponentType, PointerEvent as ReactPointerEvent } from 'react'
import {
  CssIcon,
  FigmaIcon,
  GitIcon,
  HtmlIcon,
  JavaScriptIcon,
  NodeIcon,
  PandasIcon,
  PostgreIcon,
  PythonIcon,
  ReactIcon,
  SupabaseIcon,
  TailwindIcon,
  TypeScriptIcon,
  ViteIcon,
} from './techIcons'

const TECHS: Array<{ name: string; Icon: ComponentType }> = [
  { name: 'React', Icon: ReactIcon },
  { name: 'TypeScript', Icon: TypeScriptIcon },
  { name: 'JavaScript', Icon: JavaScriptIcon },
  { name: 'Python', Icon: PythonIcon },
  { name: 'Pandas', Icon: PandasIcon },
  { name: 'Node.js', Icon: NodeIcon },
  { name: 'PostgreSQL', Icon: PostgreIcon },
  { name: 'Supabase', Icon: SupabaseIcon },
  { name: 'Tailwind CSS', Icon: TailwindIcon },
  { name: 'Vite', Icon: ViteIcon },
  { name: 'HTML5', Icon: HtmlIcon },
  { name: 'CSS3', Icon: CssIcon },
  { name: 'Git', Icon: GitIcon },
  { name: 'Figma', Icon: FigmaIcon },
]

export default function TechCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const hover = useRef(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    if (!reduced) {
      const step = () => {
        if (!hover.current && !drag.current.active) {
          el.scrollLeft += 0.6
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 2
          }
        }
        raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft }
    setDragging(true)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el || !drag.current.active) return
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
  }

  const endDrag = () => {
    drag.current.active = false
    setDragging(false)
  }

  return (
    <div className="relative mt-20 border-y border-white/5 bg-white/[0.02] py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <p className="mb-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
        Tecnologías con las que trabajo
        <span className="hidden text-[10px] font-medium normal-case tracking-normal text-zinc-700 sm:inline">
          · arrastrá para explorar
        </span>
      </p>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          hover.current = true
        }}
        onMouseLeave={() => {
          hover.current = false
        }}
        className={`scrollbar-none flex w-full select-none items-center gap-10 overflow-x-auto px-2 [touch-action:pan-y] ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {[...TECHS, ...TECHS].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            aria-hidden={i >= TECHS.length}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
              <tech.Icon />
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-zinc-400 transition-colors group-hover:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
