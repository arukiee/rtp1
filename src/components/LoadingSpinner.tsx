import { Loader2, Brain } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="card text-center animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary-500" />
          </div>
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin absolute -top-1 -right-1" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Analyzing Email with AI
          </h3>
          <p className="text-gray-600">
            Processing content and extracting insights...
          </p>
        </div>
        
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}