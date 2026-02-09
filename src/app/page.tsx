'use client';

import { useState, useCallback } from 'react';
import { TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';
import { SearchBar, ResultsList, ProductDetail, LoadingSkeleton, ErrorDisplay } from '@/components';
import { compareProducts } from '@/lib/api';
import { ProductWithAnalysis, ProductSource, CompareResponse } from '@/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CompareResponse | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithAnalysis | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  const handleSearch = useCallback(async (
    query: string,
    sources: ProductSource[],
    minPrice?: number,
    maxPrice?: number
  ) => {
    setIsLoading(true);
    setError(null);
    setLastQuery(query);

    try {
      const response = await compareProducts(query, sources, 5);
      
      // Apply client-side price filtering if needed
      let filteredProducts = response.products;
      if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
      }
      if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
      }

      setResults({
        ...response,
        products: filteredProducts,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search products';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastQuery) {
      handleSearch(lastQuery, ['amazon', 'ebay', 'walmart']);
    }
  }, [lastQuery, handleSearch]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Price Analyzer
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Compare prices across Amazon, eBay, and Walmart. Get AI-powered recommendations based on price, reviews, and quality.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Features Section - Only show when no results */}
      {!results && !isLoading && !error && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multi-Platform Search</h3>
              <p className="text-gray-600 text-sm">
                Search across Amazon, eBay, and Walmart simultaneously
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Google Gemini analyzes customer reviews for sentiment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Value Scoring</h3>
              <p className="text-gray-600 text-sm">
                Products ranked by price, reviews, and quality
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                AI-powered suggestions for the best purchase decision
              </p>
            </div>
          </div>

          {/* Sample Searches */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'wireless headphones',
                'laptop stand',
                'mechanical keyboard',
                'USB-C hub',
                'webcam 1080p',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term, ['amazon', 'ebay', 'walmart'])}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {isLoading && <LoadingSkeleton />}
        
        {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
        
        {results && !isLoading && !error && (
          <ResultsList
            products={results.products}
            bestValue={results.best_value}
            bestPrice={results.best_price}
            bestQuality={results.best_quality}
            recommendation={results.recommendation}
            onProductSelect={setSelectedProduct}
          />
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Price Analyzer — AI-powered product comparison</p>
            <p className="mt-2">
              Powered by Google Gemini AI • Data from RapidAPI
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
