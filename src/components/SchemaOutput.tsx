import React from 'react';

interface SchemaOutputProps {
  schema: string;
}

export function SchemaOutput({ schema }: SchemaOutputProps) {
  if (!schema) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schema);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Oluşturulan Schema</h2>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Kopyala
        </button>
      </div>
      <div className="relative">
        <pre className="bg-gray-50 p-6 rounded-lg overflow-x-auto font-mono text-sm border border-gray-200">
          <code className="text-gray-800">
            {schema}
          </code>
        </pre>
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
    </div>
  );
}