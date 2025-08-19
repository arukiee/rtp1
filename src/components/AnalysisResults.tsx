import { useState } from 'react';
import { Copy, Download, FileText, FolderOpen, AlertCircle, CheckSquare, Check } from 'lucide-react';
import { EmailAnalysis } from '../types';
import { EmailAnalyzer } from '../utils/emailAnalyzer';
import { AnalysisCard } from './AnalysisCard';
import { CategoryBadge } from './CategoryBadge';
import { UrgencyBadge } from './UrgencyBadge';
import { ActionBadge } from './ActionBadge';

interface AnalysisResultsProps {
  analysis: EmailAnalysis;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const formattedOutput = EmailAnalyzer.formatOutput(analysis);
    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleExport = () => {
    alert('Google Sheets integration would be implemented here. For now, use the Copy Results button to get the formatted data.');
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-gray-600">AI-powered email insights and categorization</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className={copied ? 'btn-success' : 'btn-secondary'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Results'}
            </button>
            
            <button
              onClick={handleExport}
              className="btn-warning"
            >
              <Download className="w-4 h-4" />
              Export to Sheets
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalysisCard
            title="Summary"
            icon={<FileText className="w-5 h-5 text-primary-500" />}
          >
            <p className="text-sm leading-relaxed">{analysis.summary}</p>
          </AnalysisCard>

          <AnalysisCard
            title="Category"
            icon={<FolderOpen className="w-5 h-5 text-primary-500" />}
          >
            <CategoryBadge category={analysis.category} />
          </AnalysisCard>

          <AnalysisCard
            title="Urgency"
            icon={<AlertCircle className="w-5 h-5 text-primary-500" />}
          >
            <UrgencyBadge urgency={analysis.urgency} />
          </AnalysisCard>

          <AnalysisCard
            title="Action Required"
            icon={<CheckSquare className="w-5 h-5 text-primary-500" />}
          >
            <ActionBadge actionRequired={analysis.actionRequired} />
          </AnalysisCard>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Formatted Output</h3>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {EmailAnalyzer.formatOutput(analysis)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}