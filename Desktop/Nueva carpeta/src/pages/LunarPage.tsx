import LunarCalendar from '../components/lunar/LunarCalendar';

export default function LunarPage() {
  return (
    <div className="fade-in">
      <p className="brand-mark">Anzuelando Pesca</p>
      <h1 className="page-title">Calendario lunar</h1>
      <p className="page-sub">
        Pesca diurna y nocturna según fase — estilo Anzuelando
      </p>
      <LunarCalendar />
    </div>
  );
}
