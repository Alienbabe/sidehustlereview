import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmojiRating from '../components/EmojiRating';
import CategoryTag from '../components/CategoryTag';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import { SideHustle, Review } from '../types';
import { getSideHustleById, getReviewsForSideHustle, searchSideHustles } from '../services/data';

interface SideHustleDetailPageProps {
  sideHustleId: string;
  onBack: () => void;
}

const SideHustleDetailPage: React.FC<SideHustleDetailPageProps> = ({ 
  sideHustleId, 
  onBack 
}) => {
  const [sideHustle, setSideHustle] = useState<SideHustle | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    // Get side hustle data
    const hustleData = getSideHustleById(sideHustleId);
    if (hustleData) {
      setSideHustle(hustleData);
    }
    
    // Get reviews
    const reviewsData = getReviewsForSideHustle(sideHustleId);
    setReviews(reviewsData);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Setup scroll listener for back-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sideHustleId]);

  // Handle search
  const handleSearch = (query: string) => {
    // This would ideally redirect to the home page with search results
    console.log('Search query:', query);
  };
  
  // Handle new review submission
  const handleReviewSubmit = (review: any) => {
    // In a real app, this would save to a database
    // For now, just add it to the local state
    const newReview: Review = {
      id: `temp-${Date.now()}`,
      ...review
    };
    
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // Update side hustle stats (simplified)
    if (sideHustle) {
      const newRatingsAvg = {
        money: ((sideHustle.averageRatings?.money ?? 0) * sideHustle.reviewCount + review.ratings.money) / (sideHustle.reviewCount + 1),
        effort: ((sideHustle.averageRatings?.effort ?? 0) * sideHustle.reviewCount + review.ratings.effort) / (sideHustle.reviewCount + 1),
        satisfaction: ((sideHustle.averageRatings?.satisfaction ?? 0) * sideHustle.reviewCount + review.ratings.satisfaction) / (sideHustle.reviewCount + 1)
      };
      
      setSideHustle({
        ...sideHustle,
        reviewCount: sideHustle.reviewCount + 1,
        averageRatings: {
          money: parseFloat(newRatingsAvg.money.toFixed(1)),
          effort: parseFloat(newRatingsAvg.effort.toFixed(1)),
          satisfaction: parseFloat(newRatingsAvg.satisfaction.toFixed(1))
        },
        // Add tags if they don't exist
        tags: [...new Set([...sideHustle.tags, ...review.tags])]
      });
    }
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!sideHustle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow pt-20">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to all side hustles
          </button>
        </div>
        
        {/* Side hustle header */}
        <section className="bg-white border-b border-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{sideHustle.title}</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl">{sideHustle.description}</p>
            
            {/* Ratings section */}
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
              <div className="flex items-center">
                <EmojiRating 
                  type="money" 
                  value={sideHustle.averageRatings?.money ?? 0} 
                  size="lg" 
                />
                <span className="ml-2 text-gray-700">
                  {(sideHustle.averageRatings?.money ?? 0).toFixed(1)} Income
                </span>
              </div>
              
              <div className="flex items-center">
                <EmojiRating 
                  type="effort" 
                  value={sideHustle.averageRatings?.effort ?? 0} 
                  size="lg" 
                />
                <span className="ml-2 text-gray-700">
                  {(sideHustle.averageRatings?.effort ?? 0).toFixed(1)} Effort
                </span>
              </div>
              
              <div className="flex items-center">
                <EmojiRating 
                  type="satisfaction" 
                  value={sideHustle.averageRatings?.satisfaction ?? 0} 
                  size="lg" 
                />
                <span className="ml-2 text-gray-700">
                  {(sideHustle.averageRatings?.satisfaction ?? 0).toFixed(1)} Satisfaction
                </span>
              </div>
              
              <div className="text-gray-600">
                {sideHustle.reviewCount} reviews
              </div>
            </div>
            
            {/* Categories and tags */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {sideHustle.categories.map(category => (
                    <CategoryTag key={category} label={category as any} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {sideHustle.tags.map(tag => (
                    <CategoryTag key={tag} label={tag as any} type="filter" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews and form section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Review form */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Your Review</h2>
                  <ReviewForm 
                    sideHustleId={sideHustleId} 
                    onSubmit={handleReviewSubmit} 
                  />
                </div>
              </div>
              
              {/* Reviews list */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews ({reviews.length})
                </h2>
                
                {reviews.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y">
                    {reviews.map(review => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SideHustleDetailPage;