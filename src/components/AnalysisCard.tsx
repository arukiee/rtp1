import { AnalysisCardProps } from '../types';

export function AnalysisCard({ title, icon, children }: AnalysisCardProps) {
  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}