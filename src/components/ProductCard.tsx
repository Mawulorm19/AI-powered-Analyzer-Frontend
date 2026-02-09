'use client';

import { Star, ExternalLink, TrendingUp, Award, DollarSign } from 'lucide-react';
import { ProductWithAnalysis, ProductSource } from '@/types';

interface ProductCardProps {
  product: ProductWithAnalysis;
  rank: number;
  isBestValue?: boolean;
  isBestPrice?: boolean;
  isBestQuality?: boolean;
  onClick: () => void;
}

export default function ProductCard({
  product,
  rank,
  isBestValue,
  isBestPrice,
  isBestQuality,
  onClick,
}: ProductCardProps) {
  const sourceColors: Record<ProductSource, string> = {
    amazon: 'bg-orange-100 text-orange-700',
    ebay: 'bg-blue-100 text-blue-700',
    walmart: 'bg-yellow-100 text-yellow-700',
  };

  const sourceNames: Record<ProductSource, string> = {
    amazon: 'Amazon',
    ebay: 'eBay',
    walmart: 'Walmart',
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer group relative transform transition-transform hover:-translate-y-1"
    >
      {/* Rank Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
          rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
        }`}>
          {rank}
        </div>
      </div>

      {/* Best Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        {isBestValue && (
          <div className="badge-success flex items-center gap-1">
            <Award className="w-3 h-3" />
            Best Value
          </div>
        )}
        {isBestPrice && (
          <div className="badge-primary flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Best Price
          </div>
        )}
        {isBestQuality && (
          <div className="badge-warning flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Best Quality
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        {/* Source Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`badge ${sourceColors[product.source]}`}>
            {sourceNames[product.source]}
          </span>
          {product.rating && (
            <span className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              {product.rating.toFixed(1)}
              {product.review_count && (
                <span className="text-gray-400 ml-1">
                  ({product.review_count.toLocaleString()})
                </span>
              )}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[48px]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.original_price && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.original_price, product.currency)}
              </span>
              <span className="badge-success text-xs">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>

        {/* Scores */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Value Score</span>
              <span className="font-medium">{product.value_score.toFixed(1)}/10</span>
            </div>
            <div className="score-bar">
              <div
                className={`score-fill ${getScoreColor(product.value_score)}`}
                style={{ width: `${product.value_score * 10}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-500">Price</div>
              <div className="font-semibold">{product.price_score.toFixed(1)}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-500">Reviews</div>
              <div className="font-semibold">{product.review_score.toFixed(1)}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-gray-500">Quality</div>
              <div className="font-semibold">{product.quality_score.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="btn-primary flex-1 flex items-center justify-center gap-2">
            View Details
          </button>
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-secondary p-2"
            title="Visit store"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
