import React, { useState } from 'react';
import { filterTags } from '../services/data';
import CategoryTag from './CategoryTag';
import { FilterTag } from '../types';
import { Smile } from 'lucide-react';

interface ReviewFormProps {
  sideHustleId: string;
  onSubmit: (review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ sideHustleId, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [moneyRating, setMoneyRating] = useState(0);
  const [effortRating, setEffortRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<FilterTag[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create review object
    const review = {
      sideHustleId,
      comment,
      ratings: {
        money: moneyRating,
        effort: effortRating,
        satisfaction: satisfactionRating
      },
      tags: selectedTags,
      date: new Date().toISOString(),
      // In a real app, user info would come from auth
      userId: 'temp-user-id',
      userName: 'Your Name'
    };
    
    onSubmit(review);
    
    // Reset form
    setComment('');
    setMoneyRating(0);
    setEffortRating(0);
    setSatisfactionRating(0);
    setSelectedTags([]);
  };

  // Toggle a tag selection
  const toggleTag = (tag: FilterTag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Render star rating input
  const renderRatingInput = (
    value: number, 
    onChange: (rating: number) => void,
    label: string
  ) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          {label === "Income Rating" && <span className="mr-1">💸</span>}
          {label === "Effort Rating" && <span className="mr-1">💪</span>}
          {label === "Satisfaction Rating" && <span className="mr-1">😊</span>}
          {label}
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold
                ${value >= rating 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
              `}
            >
              {"⭐"}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-yellow-50 via-blue-50 to-white py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span role="img" aria-label="review" className="text-3xl">📝</span>
            <h3 className="text-2xl font-bold text-blue-700 flex items-center">Leave a Review <span className="ml-2">⭐</span></h3>
          </div>
        
        {/* Comment textarea */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Share your experience
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="What was your experience with this side hustle?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {/* Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderRatingInput(moneyRating, setMoneyRating, "Income Rating")}
          {renderRatingInput(effortRating, setEffortRating, "Effort Rating")}
          {renderRatingInput(satisfactionRating, setSatisfactionRating, "Satisfaction Rating")}
        </div>
        
        {/* Tags */}
        <div className="mt-4 mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add tags to your review
          </label>
          <div className="flex flex-wrap gap-2">
            {filterTags.map(tag => (
              <CategoryTag
                key={tag}
                label={tag}
                type="filter"
                selected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center text-lg mt-4"
        >
          <span role="img" aria-label="sparkles" className="mr-2">✨</span> Submit Review
        </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;