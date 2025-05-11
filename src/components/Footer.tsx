import React from 'react';
import { Heart, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-blue-600 mb-2">SideHustleReview</h2>
            <p className="text-gray-600 text-sm mb-4">
              The community-driven platform for finding your perfect side hustle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Browse Side Hustles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Popular Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Trending Now
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    New Side Hustles
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Add a Review
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Submit a Side Hustle
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            Made with <Heart size={16} className="text-red-500 mx-1" /> by SideHustleReview Team © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Disclaimer: SideHustleReview is not responsible for any lost money, time, or other consequences. Users should conduct their own thorough research before considering any opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;