/**
 * API Types for Price Analyzer
 */

export type ProductSource = 'amazon' | 'ebay' | 'walmart';

export interface Review {
  text: string;
  rating: number;
  author?: string;
  date?: string;
  verified: boolean;
}

export interface SentimentAnalysis {
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  sentiment_score: number;
  pros: string[];
  cons: string[];
  summary: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency: string;
  image_url?: string;
  product_url: string;
  source: ProductSource;
  rating?: number;
  review_count?: number;
  availability: string;
}

export interface ProductWithAnalysis extends Product {
  reviews: Review[];
  sentiment?: SentimentAnalysis;
  value_score: number;
  price_score: number;
  review_score: number;
  quality_score: number;
}

export interface SearchResponse {
  query: string;
  total_results: number;
  products: Product[];
  cached: boolean;
}

export interface CompareResponse {
  products: ProductWithAnalysis[];
  best_value?: ProductWithAnalysis;
  best_price?: ProductWithAnalysis;
  best_quality?: ProductWithAnalysis;
  recommendation: string;
  cached: boolean;
}

export interface ApiError {
  error: string;
  detail?: string;
  code: number;
}
