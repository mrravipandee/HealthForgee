'use client';

import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

const WeeklyTasks = () => {
  const tasks = [
    {
      id: 1,
      icon: Circle,
      title: 'Take Morning Medicine',
      description: 'Vitamin D and Multivitamin',
      time: '9:00 AM',
      completed: false
    },
    {
      id: 2,
      icon: Circle,
      title: 'Drink Water',
      description: '1 glass of water',
      time: '10:00 AM',
      completed: false
    },
    {
      id: 3,
      icon: Circle,
      title: 'Light Exercise',
      description: '10 minutes stretching',
      time: '11:00 AM',
      completed: false
    }
  ];

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All Tasks</h2>
      </div>
      
      {/* Sub-section */}
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Morning ({completedCount}/6)
        </h3>
        
        <div className="space-y-3">
          {tasks.map((task) => {
            const IconComponent = task.icon;
            return (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <IconComponent 
                    size={20} 
                    className={task.completed ? "text-green-500" : "text-gray-400"} 
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyTasks;
