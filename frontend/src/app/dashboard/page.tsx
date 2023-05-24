'use client';

import React from 'react';
import { DoctorDashboard, CHWDashBoard } from '@components/dashboard';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const { authenticated, isDoctorLogin, isCHWLogin } = useAuth();
  if (!authenticated) {
    router.push('/login');
  }
  return <>{isDoctorLogin ? <DoctorDashboard /> : isCHWLogin ? <CHWDashBoard /> : <></>}</>;
};

export default Dashboard;
