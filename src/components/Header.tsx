import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Auth from './Auth';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">SideHustleReview</h1>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={e => { e.preventDefault(); console.log('Home link clicked'); }}>Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={e => { e.preventDefault(); console.log('Browse Hustles link clicked'); }}>Browse Hustles</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={e => { e.preventDefault(); console.log('Add Review link clicked'); }}>Add Review</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={e => { e.preventDefault(); console.log('About link clicked'); }}>About</a>
            

  {/* Auth links */}
  <div className="ml-4 hidden md:block">
    <Auth />
  </div>
            
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search side hustles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1.5 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search size={16} />
              </button>
            </form>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Browse Hustles</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Add Review</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              
              {/* Search form for mobile */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search side hustles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <Search size={16} />
                </button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;