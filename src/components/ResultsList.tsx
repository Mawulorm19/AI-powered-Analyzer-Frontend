'use client';

import { ProductWithAnalysis } from '@/types';
import ProductCard from './ProductCard';

interface ResultsListProps {
  products: ProductWithAnalysis[];
  bestValue?: ProductWithAnalysis;
  bestPrice?: ProductWithAnalysis;
  bestQuality?: ProductWithAnalysis;
  recommendation: string;
  onProductSelect: (product: ProductWithAnalysis) => void;
}

export default function ResultsList({
  products,
  bestValue,
  bestPrice,
  bestQuality,
  recommendation,
  onProductSelect,
}: ResultsListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* AI Recommendation */}
      {recommendation && (
        <div className="card p-6 border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-white">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Recommendation</h3>
              <p className="text-gray-600">{recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Found {products.length} products
        </h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Sorted by: <strong>Value Score</strong></span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            rank={index + 1}
            isBestValue={bestValue?.id === product.id}
            isBestPrice={bestPrice?.id === product.id}
            isBestQuality={bestQuality?.id === product.id}
            onClick={() => onProductSelect(product)}
          />
        ))}
      </div>
    </div>
  );
}
