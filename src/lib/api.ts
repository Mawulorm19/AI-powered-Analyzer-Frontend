import axios, { AxiosError } from 'axios';
import { SearchResponse, CompareResponse, ProductSource, ApiError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 60000, // 60 second timeout for AI processing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

/**
 * Search for products across e-commerce platforms
 */
export async function searchProducts(
  query: string,
  sources: ProductSource[] = ['amazon', 'ebay', 'walmart'],
  minPrice?: number,
  maxPrice?: number,
  limit: number = 10
): Promise<SearchResponse> {
  const params = new URLSearchParams();
  params.append('query', query);
  sources.forEach((s) => params.append('sources', s));
  if (minPrice !== undefined) params.append('min_price', minPrice.toString());
  if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());
  params.append('limit', limit.toString());

  const response = await api.get<SearchResponse>(`/search?${params.toString()}`);
  return response.data;
}

/**
 * Compare products with AI analysis
 */
export async function compareProducts(
  query: string,
  sources: ProductSource[] = ['amazon', 'ebay', 'walmart'],
  limit: number = 5
): Promise<CompareResponse> {
  const params = new URLSearchParams();
  params.append('query', query);
  sources.forEach((s) => params.append('sources', s));
  params.append('limit', limit.toString());

  const response = await api.get<CompareResponse>(`/compare?${params.toString()}`);
  return response.data;
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string; cache: object }> {
  const response = await api.get('/health');
  return response.data;
}

export default api;
