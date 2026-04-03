'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { i18nProvider } from '@/contexts/i18nContext';
import Router from '@/lib/router';

export default function App() {
  return (
    <AuthProvider>
      <i18nProvider>
        <Router />
      </i18nProvider>
    </AuthProvider>
  );
}
