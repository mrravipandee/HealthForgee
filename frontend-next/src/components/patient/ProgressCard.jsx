'use client';

import React from 'react';

const ProgressCard = () => {
  const completedTasks = 0;
  const totalTasks = 11;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className = "flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Today's Progress
        </h2>
        <span className="text-sm text-gray-600">
          {completedTasks}/{totalTasks} tasks
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600">
        Keep going! You're doing great
      </p>
    </div>
  );
};

export default ProgressCard;
