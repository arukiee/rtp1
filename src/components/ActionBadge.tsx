import { CheckCircle, XCircle } from 'lucide-react';

interface ActionBadgeProps {
  actionRequired: boolean;
}

export function ActionBadge({ actionRequired }: ActionBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
      actionRequired 
        ? 'bg-red-100 text-red-800' 
        : 'bg-green-100 text-green-800'
    }`}>
      {actionRequired ? (
        <XCircle className="w-4 h-4" />
      ) : (
        <CheckCircle className="w-4 h-4" />
      )}
      {actionRequired ? 'Yes' : 'No'}
    </span>
  );
}