import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppProvider } from './context/AppContext';
import { tonConnectOptions } from './utils/tonConnectConfig';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MissionsPage from './pages/MissionsPage';
import VolcanoPage from './pages/VolcanoPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CollectionPage from './pages/CollectionPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <TonConnectUIProvider {...tonConnectOptions}>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-prehistoric-900">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/missions" element={<MissionsPage />} />
                <Route path="/volcano" element={<VolcanoPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/collection" element={<CollectionPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </TonConnectUIProvider>
  );
}

export default App;