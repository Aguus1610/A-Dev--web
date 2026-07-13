import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { ensureSeedData } from './lib/db';

export default function App() {
  useEffect(() => {
    void ensureSeedData();
  }, []);

  return (
    <div className="app-shell">
      <main className="app-main">
        <Outlet />
      </main>
      <nav className="app-nav" aria-label="Principal">
        <div className="app-nav__inner">
          <NavLink to="/" end>
            <span className="icon" aria-hidden>
              ◈
            </span>
            Hoy
          </NavLink>
          <NavLink to="/mapa">
            <span className="icon" aria-hidden>
              ⌖
            </span>
            Mapa
          </NavLink>
          <NavLink to="/lunar">
            <span className="icon" aria-hidden>
              ◐
            </span>
            Lunar
          </NavLink>
          <NavLink to="/spots">
            <span className="icon" aria-hidden>
              ⚓
            </span>
            Spots
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
