import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'romatem2024') {
      onLogin();
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Romatem Schema Generator</h1>
            <p className="text-sm text-gray-500">Devam etmek için şifrenizi girin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="••••••••"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Yanlış şifre
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Giriş Yap
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Bu uygulama Romatem Fizik Tedavi ve Rehabilitasyon Hastanesi için özel olarak geliştirilmiştir.
        </p>
      </div>
    </div>
  );
}
