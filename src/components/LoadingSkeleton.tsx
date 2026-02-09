'use client';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* AI Recommendation Skeleton */}
      <div className="card p-6 border-l-4 border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg skeleton" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-32 skeleton" />
            <div className="h-4 bg-gray-200 rounded w-full skeleton" />
            <div className="h-4 bg-gray-200 rounded w-3/4 skeleton" />
          </div>
        </div>
      </div>

      {/* Results Summary Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-48 skeleton" />
        <div className="h-4 bg-gray-200 rounded w-32 skeleton" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card">
            <div className="h-48 bg-gray-200 skeleton" />
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full skeleton" />
                <div className="h-6 w-20 bg-gray-200 rounded skeleton" />
              </div>
              <div className="h-5 bg-gray-200 rounded w-full skeleton" />
              <div className="h-5 bg-gray-200 rounded w-3/4 skeleton" />
              <div className="h-8 bg-gray-200 rounded w-24 skeleton" />
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded skeleton" />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-12 bg-gray-200 rounded skeleton" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-10 bg-gray-200 rounded flex-1 skeleton" />
                <div className="h-10 w-10 bg-gray-200 rounded skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
