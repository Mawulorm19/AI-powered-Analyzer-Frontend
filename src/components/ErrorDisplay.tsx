'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="card p-8 border-l-4 border-red-500 bg-red-50">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
