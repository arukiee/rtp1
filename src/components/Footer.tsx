import { Heart, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>&copy; 2025 Smart Notification Agent</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for intelligent email processing</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Powered by AI for intelligent email analysis and categorization</p>
        </div>
      </div>
    </footer>
  );
}