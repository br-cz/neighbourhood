import React from 'react';
import HomePage from '@/src/components/Home/HomePage';
import EventsPage from '@/src/components/Events/EventsPage';
import MarketplacePage from '@/src/components/Marketplace/MarketplacePage';
import PeoplePage from '@/src/components/People/PeoplePage';
import ProfilePage from '@/src/components/Profile/ProfilePage';
import CommunitiesPage from '@/src/components/Communities/CommunitiesPage';

interface RouterProps {
  selectedTab: string;
}

const Router = ({ selectedTab }: RouterProps) => {
  switch (selectedTab) {
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

export default Router;
