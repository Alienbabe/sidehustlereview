import React from 'react';
import { Category, FilterTag } from '../types';

interface CategoryTagProps {
  label: Category | FilterTag;
  selected?: boolean;
  type?: 'category' | 'filter';
  onClick?: () => void;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ 
  label, 
  selected = false, 
  type = 'category',
  onClick 
}) => {
  // Color schemes based on type and selected state
  const getColors = () => {
    if (type === 'category') {
      return selected
        ? 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200'
        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';
    } else {
      return selected
        ? 'bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200'
        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getColors()} px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 whitespace-nowrap`}
    >
      {label}
    </button>
  );
};

export default CategoryTag;