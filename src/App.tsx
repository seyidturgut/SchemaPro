import React from 'react';
import { Globe } from 'lucide-react';
import { SchemaGenerator } from './components/SchemaGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Romatem Schema Generator</h1>
        </div>
        
        <SchemaGenerator />
      </div>
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-1">
          <span>by</span>
          <a 
            href="https://github.com/seyitturgut" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Seyid Turgut
          </a>
        </div>
      </footer>
    </div>
  );
}