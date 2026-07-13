export type FishingRating =
  | 'muy_malo'
  | 'malo'
  | 'regular'
  | 'bueno'
  | 'muy_bueno';

export type MoonPhaseLabel = 'Llena' | 'Menguante' | 'Nueva' | 'Creciente';

export interface DayFishingForecast {
  date: Date;
  dayOfMonth: number;
  weekday: string;
  illumination: number;
  phaseLabel: MoonPhaseLabel;
  phaseAngle: number;
  diurna: FishingRating;
  nocturna: FishingRating;
  trend: number;
  note?: string;
}

export const RATING_LABELS: Record<FishingRating, string> = {
  muy_malo: 'Muy malo',
  malo: 'Malo',
  regular: 'Regular',
  bueno: 'Bueno',
  muy_bueno: 'Muy bueno',
};

export const RATING_COLORS: Record<FishingRating, string> = {
  muy_malo: '#c62828',
  malo: '#e57373',
  regular: '#e8d5a3',
  bueno: '#a5d6a7',
  muy_bueno: '#2e7d32',
};

const WEEKDAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

/** Phase angle 0 = new moon, 0.5 = full moon (fraction of synodic cycle). */
export function getMoonPhaseFraction(date: Date): number {
  // Known new moon: 2000-01-06 18:14 UTC
  const knownNew = Date.UTC(2000, 0, 6, 18, 14, 0);
  const synodic = 29.530588853;
  const days = (date.getTime() - knownNew) / 86_400_000;
  const frac = ((days % synodic) + synodic) % synodic;
  return frac / synodic;
}

export function getIllumination(phaseFraction: number): number {
  return (1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2;
}

export function getPhaseLabel(phaseFraction: number): MoonPhaseLabel {
  if (phaseFraction < 0.03 || phaseFraction >= 0.97) return 'Nueva';
  if (phaseFraction < 0.22) return 'Creciente';
  if (phaseFraction < 0.28) return 'Creciente';
  if (phaseFraction < 0.47) return 'Creciente';
  if (phaseFraction < 0.53) return 'Llena';
  if (phaseFraction < 0.72) return 'Menguante';
  if (phaseFraction < 0.78) return 'Menguante';
  return 'Menguante';
}

/**
 * Daytime fishing: best near new moon, worst near full moon.
 * Distance from full moon (0.5) drives the rating.
 */
export function ratingFromPhase(phaseFraction: number): {
  diurna: FishingRating;
  nocturna: FishingRating;
  trend: number;
  note?: string;
} {
  const distFromFull = Math.min(
    Math.abs(phaseFraction - 0.5),
    Math.abs(phaseFraction - 0.5 - 1),
    Math.abs(phaseFraction - 0.5 + 1),
  );
  const distFromNew = Math.min(phaseFraction, 1 - phaseFraction);

  let diurna: FishingRating;
  let trend: number;

  if (distFromFull <= 0.02) {
    diurna = 'muy_malo';
    trend = 0;
  } else if (distFromFull <= 0.1) {
    diurna = 'malo';
    trend = 1;
  } else if (distFromNew <= 0.05) {
    diurna = 'muy_bueno';
    trend = 4;
  } else if (distFromNew <= 0.12) {
    diurna = 'bueno';
    trend = 3;
  } else if (distFromFull <= 0.18) {
    diurna = 'malo';
    trend = 1;
  } else if (distFromNew <= 0.2) {
    diurna = 'bueno';
    trend = 3;
  } else {
    diurna = 'regular';
    trend = 2;
  }

  let nocturna: FishingRating = 'regular';
  let note: string | undefined;

  if (distFromFull <= 0.08) {
    nocturna = 'muy_bueno';
    note = 'Pesca nocturna muy buena en luna llena';
  } else if (distFromFull <= 0.15) {
    nocturna = 'bueno';
    note = 'Se recomienda pescar durante la marea alta';
  } else if (distFromNew <= 0.08) {
    nocturna = 'bueno';
  } else {
    nocturna = diurna === 'malo' || diurna === 'muy_malo' ? 'regular' : diurna;
  }

  if (distFromNew <= 0.05) {
    note = note ?? 'Luna nueva — pico de pesca diurna';
  }

  return { diurna, nocturna, trend, note };
}

export function forecastForDate(date: Date): DayFishingForecast {
  const noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
  const phaseAngle = getMoonPhaseFraction(noon);
  const illumination = getIllumination(phaseAngle);
  const phaseLabel = getPhaseLabel(phaseAngle);
  const { diurna, nocturna, trend, note } = ratingFromPhase(phaseAngle);

  return {
    date: noon,
    dayOfMonth: noon.getDate(),
    weekday: WEEKDAYS[noon.getDay()],
    illumination,
    phaseLabel,
    phaseAngle,
    diurna,
    nocturna,
    trend,
    note,
  };
}

export function forecastForMonth(year: number, monthIndex: number): DayFishingForecast[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const result: DayFishingForecast[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    result.push(forecastForDate(new Date(year, monthIndex, d)));
  }
  return result;
}

export const TIDE_TIPS = [
  'Revisar tabla de mareas de tu zona para mejor resultado.',
  'Cuando la marea está subiendo suele ser el mejor momento para la pesca.',
  'Las mareas más fuertes son en luna llena y luna nueva.',
] as const;

export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;
