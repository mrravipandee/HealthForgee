'use client';

import React from 'react';

const DashboardHeader = ({ userName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Night!';
  };

  return (
    <div className="bg-white px-4 pt-4 pb-6 md:px-6">
      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getGreeting()}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Complete your daily health tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
