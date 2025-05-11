import React from 'react';
import { SideHustle } from '../types';
import EmojiRating from './EmojiRating';
import CategoryTag from './CategoryTag';
import { Users } from 'lucide-react';

interface SideHustleCardProps {
  sideHustle: SideHustle;
  onClick: (id: string) => void;
}

const SideHustleCard: React.FC<SideHustleCardProps> = ({ sideHustle, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transform transition duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(sideHustle.id)}
    >
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{sideHustle.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sideHustle.description}</p>
        
        {/* Emoji Ratings */}
        <div className="flex flex-wrap space-x-3 mb-4">
          <EmojiRating type="money" value={sideHustle.averageRatings.money} />
          <EmojiRating type="effort" value={sideHustle.averageRatings.effort} />
          <EmojiRating type="satisfaction" value={sideHustle.averageRatings.satisfaction} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sideHustle.tags.slice(0, 2).map(tag => (
            <CategoryTag key={tag} label={tag as any} type="filter" />
          ))}
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sideHustle.categories.slice(0, 2).map(category => (
            <CategoryTag key={category} label={category as any} />
          ))}
          {sideHustle.categories.length > 2 && (
            <span className="text-xs text-gray-500 flex items-center">
              +{sideHustle.categories.length - 2} more
            </span>
          )}
        </div>
        
        {/* Review count */}
        <div className="flex items-center text-gray-500 text-sm">
          <Users size={14} className="mr-1" />
          <span>{sideHustle.reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default SideHustleCard;