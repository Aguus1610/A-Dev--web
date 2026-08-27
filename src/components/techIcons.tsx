function Badge({
  bg,
  children,
  gradient,
}: {
  bg?: string
  gradient?: [string, string]
  children: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
      <defs>
        {gradient && (
          <linearGradient id={`grad-${gradient[0]}`} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor={gradient[0]} />
            <stop offset="1" stopColor={gradient[1]} />
          </linearGradient>
        )}
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="34.5"
        height="34.5"
        rx="9"
        fill={gradient ? `url(#grad-${gradient[0]})` : bg}
      />
      {children}
    </svg>
  )
}

function Glyph({ children, y = 23 }: { children: string; y?: number }) {
  return (
    <text
      x="18"
      y={y}
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontSize="12"
      fill="#fff"
    >
      {children}
    </text>
  )
}

export function ReactIcon() {
  return (
    <Badge bg="#61DAFB">
      <g stroke="#20232A" strokeWidth="1.3" fill="none">
        <circle cx="18" cy="18" r="2.1" fill="#20232A" stroke="none" />
        <ellipse cx="18" cy="18" rx="9.8" ry="3.7" />
        <ellipse cx="18" cy="18" rx="9.8" ry="3.7" transform="rotate(60 18 18)" />
        <ellipse cx="18" cy="18" rx="9.8" ry="3.7" transform="rotate(120 18 18)" />
      </g>
    </Badge>
  )
}

export function TypeScriptIcon() {
  return (
    <Badge bg="#3178C6">
      <Glyph>TS</Glyph>
    </Badge>
  )
}

export function JavaScriptIcon() {
  return (
    <Badge bg="#F7DF1E">
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#18181B"
      >
        JS
      </text>
    </Badge>
  )
}

export function PythonIcon() {
  return (
    <Badge gradient={['#3776AB', '#FFD43B']}>
      <Glyph>Py</Glyph>
    </Badge>
  )
}

export function PandasIcon() {
  return (
    <Badge bg="#150458">
      <Glyph>pd</Glyph>
    </Badge>
  )
}

export function NodeIcon() {
  return (
    <Badge bg="#5FA04E">
      <path
        d="M18 7.2 26.6 12v9.6L18 26.4 9.4 21.6V12L18 7.2Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <text
        x="18"
        y="20.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="7.5"
        fill="#fff"
      >
        JS
      </text>
    </Badge>
  )
}

export function PostgreIcon() {
  return (
    <Badge bg="#336791">
      <g fill="none" stroke="#fff" strokeWidth="1.6">
        <ellipse cx="18" cy="11" rx="8.2" ry="3.4" />
        <path d="M9.8 11v7c0 1.9 3.7 3.4 8.2 3.4s8.2-1.5 8.2-3.4v-7" />
        <path d="M9.8 14.5c0 1.9 3.7 3.4 8.2 3.4s8.2-1.5 8.2-3.4" />
      </g>
    </Badge>
  )
}

export function SupabaseIcon() {
  return (
    <Badge bg="#3FCF8E">
      <path d="M21.5 5 11 18.5h5.5L13.5 31 26 15.5h-6l1.5-10.5Z" fill="#1C1C1C" stroke="#1C1C1C" strokeWidth="0.5" strokeLinejoin="round" />
    </Badge>
  )
}

export function TailwindIcon() {
  return (
    <Badge bg="#0EA5E9">
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <path d="M12.5 14c1.2-2.4 3.1-3.4 5.5-3 2.2.4 3.3 1.6 4.3 3.4 1.2 2.2 3 3.6 5.7 3.4-1.2 2.4-3.1 3.4-5.5 3-2.2-.4-3.3-1.6-4.3-3.4-1.2-2.2-3-3.6-5.7-3.4Z" opacity="0.95" />
        <path d="M8.5 21.5c1.2-2.4 3.1-3.4 5.5-3 2.2.4 3.3 1.6 4.3 3.4 1.2 2.2 3 3.6 5.7 3.4-1.2 2.4-3.1 3.4-5.5 3-2.2-.4-3.3-1.6-4.3-3.4-1.2-2.2-3-3.6-5.7-3.4Z" opacity="0.55" />
      </g>
    </Badge>
  )
}

export function ViteIcon() {
  return (
    <Badge gradient={['#646CFF', '#BD34FE']}>
      <path d="M28.5 7.6 19.2 28.2c-.3.6-1.1.6-1.4 0L14 12.9 7.6 8.1c-.6-.4-.3-1.3.4-1.3l20.2-.4c.8 0 1.2.9.7 1.5l-.4-.3Z" fill="#fff" opacity="0.95" />
      <path d="M14 12.9 28.6 7.3 20.9 25.4 14 12.9Z" fill="#FFD43B" opacity="0.9" />
    </Badge>
  )
}

export function HtmlIcon() {
  return (
    <Badge bg="#E34F26">
      <Glyph y={23.5}>5</Glyph>
    </Badge>
  )
}

export function CssIcon() {
  return (
    <Badge bg="#1572B6">
      <Glyph y={23.5}>3</Glyph>
    </Badge>
  )
}

export function GitIcon() {
  return (
    <Badge bg="#F05032">
      <g fill="none" stroke="#fff" strokeWidth="1.6">
        <circle cx="12" cy="12.5" r="2.4" />
        <circle cx="24" cy="23.5" r="2.4" />
        <path d="M12 14.9V19c0 1.2.6 1.9 1.8 2.2h4.8" />
        <circle cx="18.6" cy="25.7" r="0.2" fill="#fff" />
        <path d="M14.4 12.5 21.9 21" />
      </g>
    </Badge>
  )
}

export function FigmaIcon() {
  return (
    <Badge bg="#1E1E1E">
      <g>
        <path d="M13 8.5h5a2.75 2.75 0 1 0 0-5.5h-5v5.5Z" fill="#F24E1E" />
        <path d="M13 13.75h5a2.75 2.75 0 1 1-2.75 2.75v-2.75H13Z" fill="#FF7262" />
        <path d="M13 8.5h-2.75A2.75 2.75 0 1 1 13 5.75v2.75Z" fill="#1ABCFE" />
        <path d="M13 13.75a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 0 0-5.5 0Z" fill="#A259FF" />
        <path d="M13 8.5v5.25a2.75 2.75 0 1 1-2.75-2.75H13V8.5Z" fill="#0ACF83" />
      </g>
    </Badge>
  )
}
