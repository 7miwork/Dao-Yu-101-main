'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const { t } = usei18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      // Redirect to dashboard (handled by router)
    } catch (err) {
      setError(t('auth.invalidCredentials'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          {t('common.appName')}
        </h1>
        <p className="text-center text-gray-600 mb-8">{t('auth.loginTitle')}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('common.login')}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {t('auth.noAccount')}{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-semibold">
            {t('common.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
