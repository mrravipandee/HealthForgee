"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../hooks/useAppContext';

const PatientPage = () => {
  const router = useRouter();
  const { token, userData, authChecked } = useAppContext();

  useEffect(() => {
    // Wait until authChecked is true to avoid redirecting prematurely
    if (authChecked) {
      const isAuthenticated = !!token && !!userData;
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }
  }, [authChecked, token, userData, router]);

  if (!authChecked || !token || !userData) {
    // Optionally show a loading state while checking auth or redirecting
    return <div>Checking authentication...</div>;
  }

  return (
    <div>
      Welcome, {userData?.name || 'patient'}!
    </div>
  );
};

export default PatientPage;

