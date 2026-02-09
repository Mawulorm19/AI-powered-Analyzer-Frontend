'use client';

import { useState, FormEvent } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProductSource } from '@/types';

interface SearchBarProps {
  onSearch: (query: string, sources: ProductSource[], minPrice?: number, maxPrice?: number) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sources, setSources] = useState<ProductSource[]>(['amazon', 'ebay', 'walmart']);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    onSearch(
      query.trim(),
      sources,
      minPrice ? parseFloat(minPrice) : undefined,
      maxPrice ? parseFloat(maxPrice) : undefined
    );
  };

  const toggleSource = (source: ProductSource) => {
    if (sources.includes(source)) {
      if (sources.length > 1) {
        setSources(sources.filter((s) => s !== source));
      }
    } else {
      setSources([...sources, source]);
    }
  };

  const sourceLabels: Record<ProductSource, { name: string; color: string }> = {
    amazon: { name: 'Amazon', color: 'bg-orange-500' },
    ebay: { name: 'eBay', color: 'bg-blue-500' },
    walmart: { name: 'Walmart', color: 'bg-yellow-500' },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products (e.g., wireless headphones, laptop stand...)"
              className="input-field pl-12 pr-4 py-4 text-lg"
              disabled={isLoading}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary px-4 ${showFilters ? 'bg-gray-200' : ''}`}
          >
            <Filter className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary px-8 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              'Compare Prices'
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Source Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Sources
              </label>
              <div className="flex gap-2">
                {(Object.keys(sourceLabels) as ProductSource[]).map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => toggleSource(source)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      sources.includes(source)
                        ? `${sourceLabels[source].color} text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sourceLabels[source].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    min="0"
                    step="0.01"
                    className="input-field"
                  />
                </div>
                <span className="text-gray-400">to</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    min="0"
                    step="0.01"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Active Filters Display */}
      {(sources.length < 3 || minPrice || maxPrice) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {sources.length < 3 && (
            <span className="badge-primary">
              {sources.map((s) => sourceLabels[s].name).join(', ')}
            </span>
          )}
          {minPrice && (
            <span className="badge-primary">
              Min: ${minPrice}
            </span>
          )}
          {maxPrice && (
            <span className="badge-primary">
              Max: ${maxPrice}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
