import React from 'react';

interface UrlInputProps {
  url: string;
  imageUrl: string;
  schemaType: 'medical' | 'article';
  onUrlChange: (url: string) => void;
  onImageUrlChange: (imageUrl: string) => void;
  onSchemaTypeChange: (type: 'medical' | 'article') => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

export function UrlInput({ 
  url, 
  imageUrl, 
  schemaType,
  onUrlChange, 
  onImageUrlChange,
  onSchemaTypeChange,
  onGenerate, 
  isLoading, 
  error 
}: UrlInputProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schema Generator</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://romatem.com/..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Görsel URL (Opsiyonel)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="https://romatem.com/wp-content/uploads/..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Schema Tipi
          </label>
          <div className="flex gap-6">
            <label className="relative flex items-center group cursor-pointer">
              <input
                type="radio"
                className="peer sr-only"
                name="schemaType"
                value="medical"
                checked={schemaType === 'medical'}
                onChange={(e) => onSchemaTypeChange('medical')}
              />
              <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:border-[5px] transition-all"></div>
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">Medical Web Page</span>
            </label>
            <label className="relative flex items-center group cursor-pointer">
              <input
                type="radio"
                className="peer sr-only"
                name="schemaType"
                value="article"
                checked={schemaType === 'article'}
                onChange={(e) => onSchemaTypeChange('article')}
              />
              <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:border-[5px] transition-all"></div>
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">Article</span>
            </label>
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Yükleniyor...
            </div>
          ) : (
            'Schema Oluştur'
          )}
        </button>
      </div>
    </div>
  );
}