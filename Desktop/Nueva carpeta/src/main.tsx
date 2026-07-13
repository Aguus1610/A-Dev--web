import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import LunarPage from './pages/LunarPage';
import SpotDetailPage from './pages/SpotDetailPage';
import SpotsPage from './pages/SpotsPage';
import './styles/global.css';
import 'maplibre-gl/dist/maplibre-gl.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="mapa" element={<MapPage />} />
          <Route path="lunar" element={<LunarPage />} />
          <Route path="spots" element={<SpotsPage />} />
          <Route path="spots/:id" element={<SpotDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
