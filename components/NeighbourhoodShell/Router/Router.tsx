import React from 'react';
import HomePage from '@/components/Home/HomePage';
import EventsPage from '@/components/Events/EventsPage';
import MarketplacePage from '@/components/Marketplace/MarketplacePage';
import PeoplePage from '@/components/People/PeoplePage';
import ProfilePage from '@/components/Profile/ProfilePage';
import CommunitiesPage from '@/components/Communities/CommunitiesPage';

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
