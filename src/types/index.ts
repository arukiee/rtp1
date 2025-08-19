export interface EmailAnalysis {
  summary: string;
  category: 'Academic' | 'HR' | 'Finance' | 'IT' | 'General';
  urgency: 'Critical' | 'High' | 'Normal';
  actionRequired: boolean;
}

export interface AnalysisCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}