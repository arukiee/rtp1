import { EmailAnalysis } from '../types';

export class EmailAnalyzer {
  static async analyzeEmail(emailText: string): Promise<EmailAnalysis> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const text = emailText.toLowerCase();
    
    // Extract key information
    const subject = this.extractSubject(emailText);
    const sender = this.extractSender(emailText);
    const content = this.extractContent(emailText);
    
    // Generate analysis
    const summary = this.generateSummary(emailText, subject, sender, content);
    const category = this.determineCategory(text, subject);
    const urgency = this.assessUrgency(text, subject);
    const actionRequired = this.checkActionRequired(text, content);

    return {
      summary,
      category,
      urgency,
      actionRequired
    };
  }

  private static extractSubject(emailText: string): string {
    const subjectMatch = emailText.match(/subject:\s*(.+)/i);
    return subjectMatch ? subjectMatch[1].trim() : '';
  }

  private static extractSender(emailText: string): string {
    const fromMatch = emailText.match(/from:\s*(.+)/i);
    return fromMatch ? fromMatch[1].trim() : '';
  }

  private static extractContent(emailText: string): string {
    const lines = emailText.split('\n');
    let contentStartIndex = 0;
    
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

  private static generateSummary(emailText: string, subject: string, sender: string, content: string): string {
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
    
    const words = summary.split(' ');
    if (words.length > 50) {
      summary = words.slice(0, 50).join(' ') + '...';
    }
    
    return summary || 'Email content analysis completed.';
  }

  private static determineCategory(text: string, subject: string): EmailAnalysis['category'] {
    const fullText = (text + ' ' + subject).toLowerCase();
    
    if (this.containsKeywords(fullText, [
      'course', 'class', 'assignment', 'homework', 'exam', 'grade', 'student',
      'professor', 'lecture', 'semester', 'academic', 'university', 'college',
      'research', 'thesis', 'dissertation', 'study', 'education'
    ])) {
      return 'Academic';
    }
    
    if (this.containsKeywords(fullText, [
      'hr', 'human resources', 'employee', 'hiring', 'interview', 'job',
      'position', 'salary', 'benefits', 'vacation', 'leave', 'policy',
      'performance', 'review', 'onboarding', 'training', 'recruitment'
    ])) {
      return 'HR';
    }
    
    if (this.containsKeywords(fullText, [
      'invoice', 'payment', 'budget', 'expense', 'cost', 'financial',
      'accounting', 'revenue', 'profit', 'loss', 'tax', 'billing',
      'purchase', 'vendor', 'contract', 'money', 'dollar', 'price'
    ])) {
      return 'Finance';
    }
    
    if (this.containsKeywords(fullText, [
      'server', 'system', 'network', 'software', 'hardware', 'database',
      'backup', 'security', 'password', 'login', 'access', 'maintenance',
      'update', 'upgrade', 'bug', 'error', 'technical', 'support', 'it'
    ])) {
      return 'IT';
    }
    
    return 'General';
  }

  private static assessUrgency(text: string, subject: string): EmailAnalysis['urgency'] {
    const fullText = (text + ' ' + subject).toLowerCase();
    
    if (this.containsKeywords(fullText, [
      'urgent', 'emergency', 'critical', 'immediate', 'asap', 'now',
      'crisis', 'failure', 'down', 'broken', 'security breach', 'hack'
    ])) {
      return 'Critical';
    }
    
    if (this.containsKeywords(fullText, [
      'important', 'priority', 'deadline', 'soon', 'quickly', 'fast',
      'attention', 'required', 'needed', 'today', 'tomorrow'
    ])) {
      return 'High';
    }
    
    return 'Normal';
  }

  private static checkActionRequired(text: string, content: string): boolean {
    const fullText = (text + ' ' + content).toLowerCase();
    
    return this.containsKeywords(fullText, [
      'please', 'need', 'required', 'must', 'should', 'action',
      'respond', 'reply', 'confirm', 'approve', 'review', 'complete',
      'submit', 'send', 'provide', 'update', 'fix', 'resolve',
      'schedule', 'meeting', 'call', 'discuss', 'decision'
    ]);
  }

  private static containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  static formatOutput(analysis: EmailAnalysis): string {
    return `Summary: ${analysis.summary}
Category: ${analysis.category}
Urgency: ${analysis.urgency}
Action: ${analysis.actionRequired ? 'Yes' : 'No'}`;
  }
}