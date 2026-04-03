'use client';

import React from 'react';
import DashboardLayout from '@/components/professional/DashboardLayout';
import { usei18n } from '@/contexts/i18nContext';

export default function DashboardPage() {
  const { t } = usei18n();

  const stats = [
    {
      label: t('dashboard.students'),
      value: '1,234',
      color: 'bg-blue-500',
    },
    {
      label: t('dashboard.classes'),
      value: '45',
      color: 'bg-green-500',
    },
    {
      label: t('dashboard.assignments'),
      value: '89',
      color: 'bg-purple-500',
    },
    {
      label: t('dashboard.progress'),
      value: '78%',
      color: 'bg-orange-500',
    },
  ];

  return (
    <DashboardLayout title={t('dashboard.overview')}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg mb-4`}></div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.recentActivity')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">Student John completed Module 1</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">New assignment created in Class A</span>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">Teacher updated course content</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
