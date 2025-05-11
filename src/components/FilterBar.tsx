import React, { useState } from 'react';
import { Category, FilterTag } from '../types';
import { categories, filterTags } from '../services/data';
import CategoryTag from './CategoryTag';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterBarProps {
  onCategoryChange: (category: Category | null) => void;
  onTagChange: (tag: FilterTag | null) => void;
  selectedCategory: Category | null;
  selectedTag: FilterTag | null;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onCategoryChange,
  onTagChange,
  selectedCategory,
  selectedTag,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-[5] transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile filter toggle */}
        <div className="flex justify-between items-center md:hidden">
          <button
            className="flex items-center space-x-2 text-gray-700"
            onClick={() => setExpanded(!expanded)}
          >
            <Filter size={18} />
            <span>Filters</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <div className="flex space-x-2">
            {selectedCategory && (
              <CategoryTag 
                label={selectedCategory} 
                selected={true} 
                onClick={() => onCategoryChange(null)}
              />
            )}
            {selectedTag && (
              <CategoryTag 
                label={selectedTag} 
                selected={true} 
                type="filter"
                onClick={() => onTagChange(null)}
              />
            )}
          </div>
        </div>
        
        {/* Mobile expanded filters */}
        <div className={`${expanded ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-300 md:max-h-none`}>
          <div className="pt-3 pb-2 md:pt-0 md:pb-0">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <CategoryTag
                  key={category}
                  label={category}
                  selected={selectedCategory === category}
                  onClick={() => onCategoryChange(
                    selectedCategory === category ? null : category
                  )}
                />
              ))}
            </div>
            
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filters</h3>
            <div className="flex flex-wrap gap-2">
              {filterTags.map(tag => (
                <CategoryTag
                  key={tag}
                  label={tag}
                  type="filter"
                  selected={selectedTag === tag}
                  onClick={() => onTagChange(
                    selectedTag === tag ? null : tag
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Desktop filters (always visible) */}
        <div className="hidden md:block">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Categories:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <CategoryTag
                    key={category}
                    label={category}
                    selected={selectedCategory === category}
                    onClick={() => onCategoryChange(
                      selectedCategory === category ? null : category
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div className="h-6 border-r border-gray-300 mx-2"></div>
            
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Filters:</span>
              <div className="flex flex-wrap gap-2">
                {filterTags.map(tag => (
                  <CategoryTag
                    key={tag}
                    label={tag}
                    type="filter"
                    selected={selectedTag === tag}
                    onClick={() => onTagChange(
                      selectedTag === tag ? null : tag
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;