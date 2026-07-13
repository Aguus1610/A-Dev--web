import SpotMap from '../components/map/SpotMap';

export default function MapPage() {
  return (
    <div className="fade-in">
      <p className="brand-mark">Anzuelando Pesca</p>
      <h1 className="page-title">Mapa</h1>
      <p className="page-sub">
        Spots y capas de profundidad. Tocá para agregar un lugar.
      </p>
      <SpotMap />
    </div>
  );
}
