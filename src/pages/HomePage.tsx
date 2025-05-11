import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideHustleCard from '../components/SideHustleCard';
import FilterBar from '../components/FilterBar';
import { Category, FilterTag, SideHustle } from '../types';
import { ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface HomePageProps {
  onSideHustleClick: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSideHustleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTag, setSelectedTag] = useState<FilterTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sideHustles, setSideHustles] = useState<SideHustle[]>([]);

  useEffect(() => {
    const fetchSideHustles = async () => {
      const { data, error } = await supabase.from('side_hustles').select('*');
      if (data) setSideHustles(data);
      // Optionally handle error
    };
    fetchSideHustles();
  }, []);

  // Filter side hustles based on selections
  const filteredSideHustles = (): SideHustle[] => {
    let result = [...sideHustles];
    // Apply search filter
    if (searchQuery) {
      result = result.filter(hustle =>
        hustle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hustle.description && hustle.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(hustle =>
        hustle.categories && hustle.categories.includes(selectedCategory)
      );
    }
    // Apply tag filter
    if (selectedTag) {
      result = result.filter(hustle =>
        hustle.tags && hustle.tags.includes(selectedTag)
      );
    }
    return result;
  };

  // Handle search from header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      
      {/* Hero section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Side Hustle
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Real reviews, honest experiences. Discover which side hustles actually work for people like you.
          </p>
          <button 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center"
            onClick={() => window.scrollTo({
              top: document.getElementById('side-hustles')?.offsetTop || 0,
              behavior: 'smooth'
            })}
          >
            Explore Side Hustles
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </section>
      
      {/* Featured categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="bg-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory("Best for Beginners")}
            >
              <Sparkles className="text-blue-500 mb-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Best for Beginners</h3>
              <p className="text-gray-600 text-sm">
                Easy to start side hustles with low barriers to entry. Perfect for your first gig.
              </p>
            </div>
            
            <div 
              className="bg-teal-50 p-6 rounded-lg border border-teal-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory("High Income Potential")}
            >
              <TrendingUp className="text-teal-500 mb-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">High Income Potential</h3>
              <p className="text-gray-600 text-sm">
                Side hustles that can grow into significant income streams with time and effort.
              </p>
            </div>
            
            <div 
              className="bg-amber-50 p-6 rounded-lg border border-amber-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory("Low Energy Days")}
            >
              <Clock className="text-amber-500 mb-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Low Energy Days</h3>
              <p className="text-gray-600 text-sm">
                Flexible side hustles that don't require intense focus or high energy levels.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Side Hustles */}
      <section id="side-hustles" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Side Hustles</h2>
          
          <FilterBar 
            onCategoryChange={setSelectedCategory}
            onTagChange={setSelectedTag}
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
          />
          
          <div className="mt-6">
            {filteredSideHustles().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSideHustles().map(hustle => (
                  <SideHustleCard 
                    key={hustle.id} 
                    sideHustle={hustle} 
                    onClick={onSideHustleClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No side hustles match your current filters.</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTag(null);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tried a side hustle? Help others by sharing what worked (or didn't) for you.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
            Add Your Review
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;