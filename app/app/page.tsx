'use client';

import React, { useState } from 'react';
import HomePage from '../home/page';
import EventsPage from '../events/page';
import MarketplacePage from '../marketplace/page';
import ProfilePage from '../profile/page';
import CommunitiesPage from '../communities/page';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import PeoplePage from '../people/page';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuth();
  if (!user) return null;

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'people':
        return <PeoplePage />;
      case 'profile':
        return <ProfilePage />;
      case 'communities':
        return <CommunitiesPage />;
      default:
        return <HomePage />;
    }
  };
  return (
    <NeighbourhoodShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderPage()}
    </NeighbourhoodShell>
  );
}
