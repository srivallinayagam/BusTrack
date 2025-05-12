import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import TrackPage from './pages/TrackPage';
import TicketsPage from './pages/TicketsPage';
import RoutesPage from './pages/RoutesPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="track" element={<TrackPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;