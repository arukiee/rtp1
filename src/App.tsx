import { useState } from 'react';
import { Header } from './components/Header';
import { EmailInput } from './components/EmailInput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AnalysisResults } from './components/AnalysisResults';
import { Footer } from './components/Footer';
import { EmailAnalyzer } from './utils/emailAnalyzer';
import { EmailAnalysis } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);

  const handleAnalyze = async (emailText: string) => {
    setIsLoading(true);
    setAnalysis(null);
    
    try {
      const result = await EmailAnalyzer.analyzeEmail(emailText);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing email:', error);
      alert('Failed to analyze email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Smart Email Analysis
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your email workflow with AI-powered analysis. Get instant insights on 
                content summary, categorization, urgency assessment, and action requirements.
              </p>
            </div>

            <EmailInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            {isLoading && <LoadingSpinner />}
            
            {analysis && <AnalysisResults analysis={analysis} />}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;