import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { supabase } from './supabaseClient';
import AddSideHustle from './pages/AddSideHustle';
import HomePage from './pages/HomePage';

function BrowseHustles() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 via-blue-50 to-white py-10">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 w-full max-w-2xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <span role="img" aria-label="magnifier" className="mr-2">🔍</span>
          Browse Side Hustles
        </h2>
        <p className="text-gray-700 mb-6 text-lg text-center">
          Explore creative ways to earn extra income! <span role="img" aria-label="money">💸</span>
        </p>
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="bg-blue-50 border border-blue-100 rounded-lg shadow p-6 w-full text-center">
            <span className="text-2xl mr-2">🚀</span>
            <span className="font-semibold text-blue-700">Coming soon:</span> A full directory of side hustles will appear here!
          </div>
        </div>
      </div>
    </div>
  );
}
import AddReview from './pages/AddReview';
function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-yellow-50 via-blue-50 to-white py-10">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 w-full max-w-2xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <span role="img" aria-label="info" className="mr-2">ℹ️</span>
          About SideHustleReview
        </h2>
        <p className="text-gray-700 mb-4 text-lg text-center">
          SideHustleReview is your go-to platform for discovering, sharing, and reviewing side hustles. 🚀
        </p>
        <ul className="text-gray-600 mb-6 text-base list-disc list-inside">
          <li>💡 Find new ways to earn extra income</li>
          <li>⭐ Read and write honest reviews</li>
          <li>🔍 Search by category, tag, or keyword</li>
          <li>📝 Share your experiences to help others</li>
        </ul>

        <p className="text-gray-500 text-xs mt-4 text-center">
          &copy; {new Date().getFullYear()} SideHustleReview. All rights reserved.
        </p>
      </div>
    </div>
  );
}
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AppRoutes user={user} />
    </Router>
  );
}

function AppRoutes({ user }: { user: any }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return <HomePage onSideHustleClick={() => {}} />;
  }
  return (
    <>
      <Header user={user} />
      <main className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
        <Routes>
          <Route path="/browse" element={<BrowseHustles />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-hustle" element={<AddSideHustle />} />
          {user && <Route path="/dashboard" element={<Dashboard user={user} />} />}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;