'use client';

import React from 'react';
import { useAppContext } from '../../../hooks/useAppContext';
import BottomNavigation from '../../../components/patient/BottomNavigation';
import DashboardHeader from '../../../components/patient/DashboardHeader';
import ProgressCard from '../../../components/patient/ProgressCard';
import QuickActions from '../../../components/patient/QuickActions';
import AddTaskButton from '../../../components/patient/AddTaskButton';
import WeeklyTasks from '../../../components/patient/WeeklyTasks';

const PatientHome = () => {
  const { userData } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <DashboardHeader userName={userData?.name} />
      
      <div className="px-4 pb-20 md:px-6 md:pb-6">
        <div className="max-w-md mx-auto md:max-w-4xl space-y-6 md:space-y-8">
          {/* Progress Card */}
          <ProgressCard />
          
          {/* Desktop: Two Column Layout */}
          <div className="md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6">
            <QuickActions />
            <AddTaskButton />
          </div>
          
          {/* All Tasks */}
          <WeeklyTasks />
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PatientHome;

