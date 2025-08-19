import { useState } from 'react';
import { Search, Trash2, Loader2 } from 'lucide-react';

interface EmailInputProps {
  onAnalyze: (emailText: string) => void;
  isLoading: boolean;
}

export function EmailInput({ onAnalyze, isLoading }: EmailInputProps) {
  const [emailText, setEmailText] = useState('');

  const handleAnalyze = () => {
    if (emailText.trim()) {
      onAnalyze(emailText.trim());
    }
  };

  const handleClear = () => {
    setEmailText('');
  };

  const placeholder = `Paste your email content here...

Example:
From: john@company.com
To: team@company.com
Subject: Urgent: Server maintenance tonight

Hi team,

We need to perform emergency server maintenance tonight from 11 PM to 3 AM. Please ensure all critical processes are backed up.

Best regards,
John`;

  return (
    <div className="card animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Content</h2>
        <p className="text-gray-600">Paste your raw email text below for intelligent analysis</p>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder={placeholder}
          rows={12}
          className="input-field font-mono text-sm"
          disabled={isLoading}
        />
        
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={handleClear}
            className="btn-secondary"
            disabled={isLoading || !emailText.trim()}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !emailText.trim()}
            className="btn-primary"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isLoading ? 'Analyzing...' : 'Analyze Email'}
          </button>
        </div>
      </div>
    </div>
  );
}