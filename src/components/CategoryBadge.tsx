import { EmailAnalysis } from '../types';

interface CategoryBadgeProps {
  category: EmailAnalysis['category'];
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const styles = {
    Academic: 'bg-blue-100 text-blue-800',
    HR: 'bg-yellow-100 text-yellow-800',
    Finance: 'bg-green-100 text-green-800',
    IT: 'bg-purple-100 text-purple-800',
    General: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[category]}`}>
      {category}
    </span>
  );
}