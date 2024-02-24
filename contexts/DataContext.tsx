'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCurrentCommunity, useCurrentUser } from '@/src/api/appQueries';
import { Community, User } from '@/src/API';

interface DataContextType {
  user: User | null;
  community: Community | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useCurrentUser();
  const { community } = useCurrentCommunity();

  return (
    <DataContext.Provider
      value={{
        user,
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
