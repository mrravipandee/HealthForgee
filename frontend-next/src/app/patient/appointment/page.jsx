'use client';

import React from 'react';
import { useAppContext } from '../../../hooks/useAppContext';
import BottomNavigation from '../../../components/patient/BottomNavigation';

const PatientAppointments = () => {
  const { userData } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-white px-4 pt-4 pb-6 md:px-6">
        <div className="max-w-md mx-auto md:max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Your Appointments
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Manage your upcoming and past appointments
          </p>
        </div>
      </div>
      
      <div className="px-4 pb-20 md:px-6 md:pb-6">
        <div className="max-w-md mx-auto md:max-w-4xl space-y-6 md:space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
            <p className="text-gray-600">No upcoming appointments scheduled.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h2>
            <p className="text-gray-600">No recent appointments found.</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PatientAppointments;

