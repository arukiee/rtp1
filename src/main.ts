interface EmailAnalysis {
  summary: string;
  category: 'Academic' | 'HR' | 'Finance' | 'IT' | 'General';
  urgency: 'Critical' | 'High' | 'Normal';
  actionRequired: boolean;
}

class SmartNotificationAgent {
  private emailInput: HTMLTextAreaElement;
  private analyzeBtn: HTMLButtonElement;
  private clearBtn: HTMLButtonElement;
  private copyBtn: HTMLButtonElement;
  private exportBtn: HTMLButtonElement;
  private resultsSection: HTMLElement;
  private loadingSection: HTMLElement;
  private summaryContent: HTMLElement;
  private categoryContent: HTMLElement;
  private urgencyContent: HTMLElement;
  private actionContent: HTMLElement;
  private formattedOutput: HTMLElement;

  constructor() {
    this.initializeElements();
    this.bindEvents();
  }

  private initializeElements(): void {
    this.emailInput = document.getElementById('emailInput') as HTMLTextAreaElement;
    this.analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
    this.clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
    this.copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
    this.exportBtn = document.getElementById('exportBtn') as HTMLButtonElement;
    this.resultsSection = document.getElementById('resultsSection') as HTMLElement;
    this.loadingSection = document.getElementById('loadingSection') as HTMLElement;
    this.summaryContent = document.getElementById('summaryContent') as HTMLElement;
    this.categoryContent = document.getElementById('categoryContent') as HTMLElement;
    this.urgencyContent = document.getElementById('urgencyContent') as HTMLElement;
    this.actionContent = document.getElementById('actionContent') as HTMLElement;
    this.formattedOutput = document.getElementById('formattedOutput') as HTMLElement;
  }

  private bindEvents(): void {
    this.analyzeBtn.addEventListener('click', () => this.analyzeEmail());
    this.clearBtn.addEventListener('click', () => this.clearInput());
    this.copyBtn.addEventListener('click', () => this.copyResults());
    this.exportBtn.addEventListener('click', () => this.exportToSheets());
    
    this.emailInput.addEventListener('input', () => {
      this.analyzeBtn.disabled = this.emailInput.value.trim().length === 0;
    });

    // Initialize button state
    this.analyzeBtn.disabled = true;
  }

  private async analyzeEmail(): Promise<void> {
    const emailText = this.emailInput.value.trim();
    if (!emailText) return;

    this.showLoading();
    
    try {
      // Simulate AI processing with realistic delay
      await this.delay(2000 + Math.random() * 2000);
      
      const analysis = await this.processEmailWithAI(emailText);
      this.displayResults(analysis);
    } catch (error) {
      console.error('Error analyzing email:', error);
      this.showError('Failed to analyze email. Please try again.');
    }
  }

  private async processEmailWithAI(emailText: string): Promise<EmailAnalysis> {
    // This is a sophisticated rule-based analysis that simulates AI processing
    // In a real implementation, this would call an actual LLM API
    
    const text = emailText.toLowerCase();
    const lines = emailText.split('\n').filter(line => line.trim());
    
    // Extract key information
    const subject = this.extractSubject(emailText);
    const sender = this.extractSender(emailText);
    const content = this.extractContent(emailText);
    
    // Generate summary
    const summary = this.generateSummary(emailText, subject, sender, content);
    
    // Determine category
    const category = this.determineCategory(text, subject);
    
    // Assess urgency
    const urgency = this.assessUrgency(text, subject);
    
    // Check if action is required
    const actionRequired = this.checkActionRequired(text, content);

    return {
      summary,
      category,
      urgency,
      actionRequired
    };
  }

  private extractSubject(emailText: string): string {
    const subjectMatch = emailText.match(/subject:\s*(.+)/i);
    return subjectMatch ? subjectMatch[1].trim() : '';
  }

  private extractSender(emailText: string): string {
    const fromMatch = emailText.match(/from:\s*(.+)/i);
    return fromMatch ? fromMatch[1].trim() : '';
  }

  private extractContent(emailText: string): string {
    const lines = emailText.split('\n');
    let contentStartIndex = 0;
    
    // Find where the actual content starts (after headers)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '' && i > 0) {
        contentStartIndex = i + 1;
        break;
      }
      if (!line.includes(':') && line.length > 0) {
        contentStartIndex = i;
        break;
      }
    }
    
    return lines.slice(contentStartIndex).join('\n').trim();
  }

  private generateSummary(emailText: string, subject: string, sender: string, content: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const keyPoints = sentences.slice(0, 3).map(s => s.trim());
    
    let summary = '';
    
    if (sender) {
      summary += `Email from ${sender.split('@')[0] || sender}. `;
    }
    
    if (subject) {
      summary += `Subject: ${subject}. `;
    }
    
    if (keyPoints.length > 0) {
      summary += keyPoints.join('. ');
      if (!summary.endsWith('.')) summary += '.';
    }
    
    // Ensure summary is roughly 5 lines when displayed
    const words = summary.split(' ');
    if (words.length > 50) {
      summary = words.slice(0, 50).join(' ') + '...';
    }
    
    return summary || 'Email content analysis completed.';
  }

  private determineCategory(text: string, subject: string): EmailAnalysis['category'] {
    const fullText = (text + ' ' + subject).toLowerCase();
    
    // Academic keywords
    if (this.containsKeywords(fullText, [
      'course', 'class', 'assignment', 'homework', 'exam', 'grade', 'student',
      'professor', 'lecture', 'semester', 'academic', 'university', 'college',
      'research', 'thesis', 'dissertation', 'study', 'education'
    ])) {
      return 'Academic';
    }
    
    // HR keywords
    if (this.containsKeywords(fullText, [
      'hr', 'human resources', 'employee', 'hiring', 'interview', 'job',
      'position', 'salary', 'benefits', 'vacation', 'leave', 'policy',
      'performance', 'review', 'onboarding', 'training', 'recruitment'
    ])) {
      return 'HR';
    }
    
    // Finance keywords
    if (this.containsKeywords(fullText, [
      'invoice', 'payment', 'budget', 'expense', 'cost', 'financial',
      'accounting', 'revenue', 'profit', 'loss', 'tax', 'billing',
      'purchase', 'vendor', 'contract', 'money', 'dollar', 'price'
    ])) {
      return 'Finance';
    }
    
    // IT keywords
    if (this.containsKeywords(fullText, [
      'server', 'system', 'network', 'software', 'hardware', 'database',
      'backup', 'security', 'password', 'login', 'access', 'maintenance',
      'update', 'upgrade', 'bug', 'error', 'technical', 'support', 'it'
    ])) {
      return 'IT';
    }
    
    return 'General';
  }

  private assessUrgency(text: string, subject: string): EmailAnalysis['urgency'] {
    const fullText = (text + ' ' + subject).toLowerCase();
    
    // Critical urgency keywords
    if (this.containsKeywords(fullText, [
      'urgent', 'emergency', 'critical', 'immediate', 'asap', 'now',
      'crisis', 'failure', 'down', 'broken', 'security breach', 'hack'
    ])) {
      return 'Critical';
    }
    
    // High urgency keywords
    if (this.containsKeywords(fullText, [
      'important', 'priority', 'deadline', 'soon', 'quickly', 'fast',
      'attention', 'required', 'needed', 'today', 'tomorrow'
    ])) {
      return 'High';
    }
    
    return 'Normal';
  }

  private checkActionRequired(text: string, content: string): boolean {
    const fullText = (text + ' ' + content).toLowerCase();
    
    return this.containsKeywords(fullText, [
      'please', 'need', 'required', 'must', 'should', 'action',
      'respond', 'reply', 'confirm', 'approve', 'review', 'complete',
      'submit', 'send', 'provide', 'update', 'fix', 'resolve',
      'schedule', 'meeting', 'call', 'discuss', 'decision'
    ]);
  }

  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private displayResults(analysis: EmailAnalysis): void {
    this.hideLoading();
    
    // Update summary
    this.summaryContent.textContent = analysis.summary;
    
    // Update category
    this.categoryContent.textContent = analysis.category;
    this.categoryContent.className = `category-badge ${analysis.category.toLowerCase()}`;
    
    // Update urgency
    this.urgencyContent.textContent = analysis.urgency;
    this.urgencyContent.className = `urgency-badge ${analysis.urgency.toLowerCase()}`;
    
    // Update action required
    const actionText = analysis.actionRequired ? 'Yes' : 'No';
    this.actionContent.textContent = actionText;
    this.actionContent.className = `action-badge ${actionText.toLowerCase()}`;
    
    // Update formatted output
    const formattedText = this.formatOutput(analysis);
    this.formattedOutput.textContent = formattedText;
    
    this.resultsSection.style.display = 'block';
    this.resultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  private formatOutput(analysis: EmailAnalysis): string {
    return `Summary: ${analysis.summary}
Category: ${analysis.category}
Urgency: ${analysis.urgency}
Action: ${analysis.actionRequired ? 'Yes' : 'No'}`;
  }

  private showLoading(): void {
    this.resultsSection.style.display = 'none';
    this.loadingSection.style.display = 'block';
    this.analyzeBtn.disabled = true;
  }

  private hideLoading(): void {
    this.loadingSection.style.display = 'none';
    this.analyzeBtn.disabled = false;
  }

  private showError(message: string): void {
    this.hideLoading();
    alert(message); // In a real app, use a proper toast/notification system
  }

  private clearInput(): void {
    this.emailInput.value = '';
    this.resultsSection.style.display = 'none';
    this.analyzeBtn.disabled = true;
    this.emailInput.focus();
  }

  private async copyResults(): Promise<void> {
    if (!this.formattedOutput.textContent) return;
    
    try {
      await navigator.clipboard.writeText(this.formattedOutput.textContent);
      
      // Visual feedback
      const originalText = this.copyBtn.innerHTML;
      this.copyBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
        Copied!
      `;
      
      setTimeout(() => {
        this.copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy results to clipboard');
    }
  }

  private exportToSheets(): void {
    // This would integrate with Google Sheets API in a real implementation
    alert('Google Sheets integration would be implemented here. For now, use the Copy Results button to get the formatted data.');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new SmartNotificationAgent();
});