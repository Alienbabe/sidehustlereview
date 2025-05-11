import React from 'react';
import { Review } from '../types';
import EmojiRating from './EmojiRating';
import CategoryTag from './CategoryTag';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
            {review.userName.charAt(0)}
          </div>
          <span className="ml-2 font-medium text-gray-800">{review.userName}</span>
        </div>
        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
      </div>
      
      {/* Review content */}
      <p className="text-gray-700 my-3">{review.comment}</p>
      
      {/* Emoji ratings */}
      <div className="flex flex-wrap gap-4 mb-3">
        <EmojiRating 
          type="money" 
          value={review.ratings.money} 
          size="sm" 
          showLabel={true} 
        />
        <EmojiRating 
          type="effort" 
          value={review.ratings.effort} 
          size="sm"
          showLabel={true} 
        />
        <EmojiRating 
          type="satisfaction" 
          value={review.ratings.satisfaction} 
          size="sm"
          showLabel={true} 
        />
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {review.tags.map(tag => (
          <CategoryTag key={tag} label={tag as any} type="filter" />
        ))}
      </div>
    </div>
  );
};

export default ReviewItem;