export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  weatherCode: number;
  time: string;
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  precipitation: number[];
  precipitationProbability: number[];
  windSpeed: number[];
  windGusts: number[];
  weatherCode: number[];
  pressure: number[];
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyWeather;
  timezone: string;
}

const WMO: Record<number, string> = {
  0: 'Despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna ligera',
  53: 'Llovizna',
  55: 'Llovizna intensa',
  61: 'Lluvia ligera',
  63: 'Lluvia',
  65: 'Lluvia intensa',
  66: 'Lluvia congelante',
  67: 'Lluvia congelante intensa',
  71: 'Nieve ligera',
  73: 'Nieve',
  75: 'Nieve intensa',
  77: 'Granizo de nieve',
  80: 'Chubascos ligeros',
  81: 'Chubascos',
  82: 'Chubascos fuertes',
  85: 'Chubascos de nieve',
  86: 'Chubascos de nieve fuertes',
  95: 'Tormenta',
  96: 'Tormenta con granizo',
  99: 'Tormenta fuerte con granizo',
};

export function weatherCodeLabel(code: number): string {
  return WMO[code] ?? `Código ${code}`;
}

export function windDirectionLabel(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const i = Math.round(degrees / 45) % 8;
  return dirs[i];
}

export async function fetchWeather(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<WeatherBundle> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_gusts_10m',
      'wind_direction_10m',
      'weather_code',
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation',
      'precipitation_probability',
      'wind_speed_10m',
      'wind_gusts_10m',
      'weather_code',
      'pressure_msl',
    ].join(','),
    forecast_days: '3',
    timezone: 'auto',
    wind_speed_unit: 'kmh',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    signal,
  });
  if (!res.ok) throw new Error(`Clima no disponible (${res.status})`);

  const data = await res.json();
  const c = data.current;

  return {
    timezone: data.timezone,
    current: {
      temperature: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      precipitation: c.precipitation,
      cloudCover: c.cloud_cover,
      pressure: c.pressure_msl,
      windSpeed: c.wind_speed_10m,
      windGusts: c.wind_gusts_10m,
      windDirection: c.wind_direction_10m,
      weatherCode: c.weather_code,
      time: c.time,
    },
    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      precipitation: data.hourly.precipitation,
      precipitationProbability: data.hourly.precipitation_probability,
      windSpeed: data.hourly.wind_speed_10m,
      windGusts: data.hourly.wind_gusts_10m,
      weatherCode: data.hourly.weather_code,
      pressure: data.hourly.pressure_msl,
    },
  };
}

export function pressureTrend(
  hourly: HourlyWeather,
  nowIso?: string,
): 'subiendo' | 'bajando' | 'estable' {
  const idx = nowIso
    ? hourly.time.findIndex((t) => t >= nowIso)
    : hourly.time.findIndex((t) => new Date(t) >= new Date());
  const i = idx < 3 ? 3 : idx;
  if (i < 0 || i >= hourly.pressure.length) return 'estable';
  const now = hourly.pressure[i];
  const prev = hourly.pressure[i - 3];
  const delta = now - prev;
  if (delta > 0.8) return 'subiendo';
  if (delta < -0.8) return 'bajando';
  return 'estable';
}
