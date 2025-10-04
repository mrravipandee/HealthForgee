'use client';

import React from 'react';
import { Upload, Pill, BarChart3 } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: Upload,
      title: 'Upload\nReport',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-700'
    },
    {
      id: 2,
      icon: Pill,
      title: 'Add\nMedication',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      textColor: 'text-pink-700'
    },
    {
      id: 3,
      icon: BarChart3,
      title: 'View\nAnalytics',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-700'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="flex gap-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              className={`${action.bgColor} ${action.iconColor} flex-1 aspect-square rounded-xl flex flex-col items-center justify-center p-4 hover:opacity-80 transition-opacity`}
            >
              <IconComponent size={24} className="mb-2" />
              <span className={`text-xs font-medium text-center whitespace-pre-line ${action.textColor}`}>
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
