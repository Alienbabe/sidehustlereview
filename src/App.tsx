import React, { useState } from 'react';
import Auth from './components/Auth'; // <-- Import Auth component
import HomePage from './pages/HomePage';
import SideHustleDetailPage from './pages/SideHustleDetailPage';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeSideHustleId, setActiveSideHustleId] = useState<string | null>(null);

  // Handle side hustle click to show detail page
  const handleSideHustleClick = (id: string) => {
    setActiveSideHustleId(id);
    setActivePage('detail');
  };

  // Handle navigation back to home page
  const handleBackToHome = () => {
    setActivePage('home');
    setActiveSideHustleId(null);
  };

  return (
    <>

      {activePage === 'home' ? (
        <HomePage onSideHustleClick={handleSideHustleClick} />
      ) : (
        <SideHustleDetailPage 
          sideHustleId={activeSideHustleId || '1'} 
          onBack={handleBackToHome} 
        />
      )}
    </>
  );
}

export default App;