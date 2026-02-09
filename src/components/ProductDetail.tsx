'use client';

import { X, Star, ExternalLink, ThumbsUp, ThumbsDown, TrendingUp, Award, DollarSign, Package } from 'lucide-react';
import { ProductWithAnalysis, ProductSource } from '@/types';

interface ProductDetailProps {
  product: ProductWithAnalysis;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
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

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-600 bg-green-100';
    if (score >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSentimentIcon = () => {
    if (!product.sentiment) return null;
    
    switch (product.sentiment.overall_sentiment) {
      case 'positive':
        return <ThumbsUp className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <ThumbsDown className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <span className={`badge ${sourceColors[product.source]}`}>
            {sourceNames[product.source]}
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              {/* Product Image */}
              <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center mb-6">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="max-h-64 max-w-full object-contain"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= product.rating!
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  {product.review_count && (
                    <span className="text-gray-500">
                      ({product.review_count.toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.original_price, product.currency)}
                    </span>
                    <span className="badge-success">-{discountPercentage}% OFF</span>
                  </>
                )}
              </div>

              {/* Buy Button */}
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                View on {sourceNames[product.source]}
              </a>
            </div>

            {/* Right Column - Scores and Analysis */}
            <div className="space-y-6">
              {/* Value Score Card */}
              <div className="card p-6 border-2 border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Value Score</h3>
                  <div className={`text-3xl font-bold ${getScoreColor(product.value_score)} px-4 py-2 rounded-lg`}>
                    {product.value_score.toFixed(1)}/10
                  </div>
                </div>
                <div className="score-bar h-3">
                  <div
                    className={`score-fill ${getScoreBarColor(product.value_score)}`}
                    style={{ width: `${product.value_score * 10}%` }}
                  />
                </div>
              </div>

              {/* Individual Scores */}
              <div className="grid grid-cols-3 gap-4">
                <div className="card p-4 text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-800">{product.price_score.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Price Score</div>
                </div>
                <div className="card p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold text-gray-800">{product.review_score.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Review Score</div>
                </div>
                <div className="card p-4 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-800">{product.quality_score.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Quality Score</div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              {product.sentiment && (
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {getSentimentIcon()}
                    <h3 className="text-lg font-semibold">Customer Sentiment</h3>
                    <span className={`badge ml-auto ${
                      product.sentiment.overall_sentiment === 'positive'
                        ? 'badge-success'
                        : product.sentiment.overall_sentiment === 'negative'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}>
                      {product.sentiment.overall_sentiment}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{product.sentiment.summary}</p>

                  {/* Pros */}
                  {product.sentiment.pros.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {product.sentiment.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-1">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cons */}
                  {product.sentiment.cons.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {product.sentiment.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-500 mt-1">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Sample Reviews</h3>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {product.reviews.slice(0, 5).map((review, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          {review.author && (
                            <span className="text-sm text-gray-500">{review.author}</span>
                          )}
                          {review.verified && (
                            <span className="badge-success text-xs">Verified</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
