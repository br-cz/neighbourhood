'use client';

import React, { useState } from 'react';
import Router from '@/src/components/NeighbourhoodShell/Router/Router';
import { NeighbourhoodShell } from '@/src/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/src/components/Authorization/useAuth';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuth();
  if (!user) return null;

  return (
    <NeighbourhoodShell activeTab={activeTab} setActiveTab={setActiveTab}>
      <Router selectedTab={activeTab} />
    </NeighbourhoodShell>
  );
}
