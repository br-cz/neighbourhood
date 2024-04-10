'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCurrentCommunity } from '@/src/hooks/communityCustomHooks';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { Community, User } from '@/src/API';

interface DataContextType {
  currentUser: User | null;
  community: Community | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const { community } = useCurrentCommunity();

  return (
    <DataContext.Provider
      value={{
        currentUser,
        community,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
