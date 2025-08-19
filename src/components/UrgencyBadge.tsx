import { EmailAnalysis } from '../types';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: EmailAnalysis['urgency'];
}

export function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  const config = {
    Critical: {
      style: 'bg-red-100 text-red-800',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    High: {
      style: 'bg-orange-100 text-orange-800',
      icon: <Clock className="w-4 h-4" />,
    },
    Normal: {
      style: 'bg-green-100 text-green-800',
      icon: <CheckCircle className="w-4 h-4" />,
    },
  };

  const { style, icon } = config[urgency];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style}`}>
      {icon}
      {urgency}
    </span>
  );
}