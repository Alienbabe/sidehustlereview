import React from 'react';
import { DollarSign, Battery, Heart } from 'lucide-react';

interface EmojiRatingProps {
  type: 'money' | 'effort' | 'satisfaction';
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const EmojiRating: React.FC<EmojiRatingProps> = ({ 
  type, 
  value,
  size = 'md',
  showLabel = false 
}) => {
  // Maps for icons, colors, and labels
  const iconMap = {
    money: DollarSign,
    effort: Battery,
    satisfaction: Heart
  };

  const sizeClassMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const labelMap = {
    money: 'Income',
    effort: 'Effort',
    satisfaction: 'Satisfaction'
  };

  const colorMap = {
    money: ['text-gray-300', 'text-green-200', 'text-green-400', 'text-green-500', 'text-green-600'],
    effort: ['text-gray-300', 'text-amber-200', 'text-amber-400', 'text-amber-500', 'text-amber-600'],
    satisfaction: ['text-gray-300', 'text-pink-200', 'text-pink-400', 'text-pink-500', 'text-pink-600']
  };

  // Get the correct icon component
  const Icon = iconMap[type];
  
  // Create array of 5 elements for rating
  const ratingIcons = Array.from({ length: 5 }, (_, i) => {
    // Calculate if this should be filled (i < value)
    const isFilled = i < Math.floor(value);
    // Calculate if this should be half-filled (value is between i and i+1)
    const isHalfFilled = Math.ceil(value) === i + 1 && value % 1 !== 0;
    
    // Choose the color based on whether it's filled
    const colorIndex = isFilled ? Math.min(i + 1, 4) : 0;
    
    return (
      <Icon 
        key={i}
        className={`${sizeClassMap[size]} ${colorMap[type][colorIndex]} ${isFilled ? 'fill-current' : ''}`}
      />
    );
  });

  return (
    <div className="flex items-center space-x-1">
      {showLabel && (
        <span className="text-xs font-medium text-gray-600 mr-1">
          {labelMap[type]}:
        </span>
      )}
      <div className="flex">{ratingIcons}</div>
      {showLabel && (
        <span className="text-xs font-medium ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default EmojiRating;