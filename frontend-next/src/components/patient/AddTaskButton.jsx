'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const AddTaskButton = () => {
  return (
    <button className="w-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-xl p-4 flex items-center justify-center gap-3 transition-all duration-200 border border-purple-200">
      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
        <Plus size={16} className="text-white" />
      </div>
      <span className="text-purple-700 font-medium">Add New Task</span>
    </button>
  );
};

export default AddTaskButton;
