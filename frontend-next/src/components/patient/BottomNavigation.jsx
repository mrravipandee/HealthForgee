'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Calendar, User } from 'lucide-react'

const BottomNavigation = () => {
  const pathname = usePathname();

  const tabs = [
    {
      href: '/patient/home',
      icon: BarChart3,
      label: 'Dashboard'
    },
    {
      href: '/patient/appointment',
      icon: Calendar,
      label: 'Appointments'
    },
    {
      href: '/patient/profile',
      icon: User,
      label: 'Profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = pathname === tab.href;
            
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent 
                  size={20} 
                  className={isActive ? 'text-purple-600' : 'text-gray-500'} 
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
