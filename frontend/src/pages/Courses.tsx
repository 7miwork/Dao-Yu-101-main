'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/professional/DashboardLayout';
import { usei18n } from '@/contexts/i18nContext';

interface CourseItem {
  id: number;
  title: string;
  description: string;
  price: number;
  students: number;
}

export default function CoursesPage() {
  const { t } = usei18n();
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: 1,
      title: 'Introduction to Mathematics',
      description: 'Learn the basics of mathematics',
      price: 29.99,
      students: 150,
    },
    {
      id: 2,
      title: 'English Language Mastery',
      description: 'Improve your English skills',
      price: 39.99,
      students: 200,
    },
    {
      id: 3,
      title: 'Science Fundamentals',
      description: 'Explore the world of science',
      price: 34.99,
      students: 120,
    },
  ]);

  return (
    <DashboardLayout title={t('navigation.courses')}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{t('navigation.courses')}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + {t('common.save')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                <span className="text-sm text-gray-500">{course.students} {t('dashboard.students')}</span>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition">
                {t('common.edit')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
