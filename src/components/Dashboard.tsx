import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border border-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <span role="img" aria-label="wave" className="mr-2">👋</span>
          Welcome, {user?.email || 'User'}!
        </h2>
        <p className="text-gray-700 mb-8">Glad to see you back on <span className="font-semibold text-blue-600">SideHustleReview</span>! 🚀</p>
        <div className="flex flex-col gap-4 mb-8">
          <Link to="/add-review" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors">
            <span role="img" aria-label="star" className="mr-2">⭐</span> Add Review
          </Link>
          <Link to="/add-hustle" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-green-600 transition-colors">
            <span role="img" aria-label="bulb" className="mr-2">💡</span> Add Side Hustle
          </Link>
          <Link to="/browse" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <span role="img" aria-label="search" className="mr-2">🔍</span> Browse Hustles
          </Link>
        </div>
        <div className="text-gray-500 text-sm">More features coming soon!</div>
      </div>
    </div>
  );
}
