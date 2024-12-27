import React, { useState } from 'react';
import { generateArticleSchema } from '../types/Schema';
import { scrapeUrl } from '../utils/scraper';
import { UrlInput } from './UrlInput';
import { SchemaOutput } from './SchemaOutput';
import { useSchemaGeneration } from '../hooks/useSchemaGeneration';

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<'medical' | 'article'>('medical');
  const [articleBody, setArticleBody] = useState('');
  
  const {
    url,
    setUrl,
    imageUrl,
    setImageUrl,
    generatedSchema,
    isLoading,
    error,
    generateSchema
  } = useSchemaGeneration();

  const handleGenerate = async () => {
    await generateSchema(schemaType, articleBody);
  };

  return (
    <>
      <UrlInput 
        url={url}
        imageUrl={imageUrl}
        schemaType={schemaType}
        onUrlChange={setUrl}
        onImageUrlChange={setImageUrl}
        onSchemaTypeChange={setSchemaType}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        error={error}
      />

      {schemaType === 'article' && (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <label 
              htmlFor="articleBody" 
              className="block text-xl font-bold text-gray-800"
            >
              Article Body (Manuel Giriş)
            </label>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Manuel içerik girişi için bu alanı kullanın
            </div>
          </div>
          
          <div className="relative">
            <textarea
              id="articleBody"
              name="articleBody"
              rows={8}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm resize-y bg-white shadow-inner"
              value={articleBody}
              onChange={(e) => setArticleBody(e.target.value)}
              placeholder="Makale içeriğini buraya girebilirsiniz..."
            />
            <div className="absolute top-4 right-4 flex space-x-2 pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {articleBody.length} karakter
            </div>
            <button 
              onClick={() => setArticleBody('')}
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Temizle
            </button>
          </div>
        </div>
      )}

      <SchemaOutput schema={generatedSchema} />
    </>
  );
}