'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataContextType {
  user: User | null;
  community: Community | null;
  setUser: (user: User | null) => void;
  setCommunity: (community: Community | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [community, setCommunity] = useState<Community | null>(null);

  useEffect(() => {
    // Check user and community IDs stored in local storage
    const storedUser = localStorage.getItem('currentUser');
    const storedCommunity = localStorage.getItem('currentCommunity');
    // If they exist, set the user and community state to the stored values
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setCommunity(storedCommunity ? JSON.parse(storedCommunity) : null);
    // TODO: Subscribe to changes in the user and community states
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        community,
        setUser,
        setCommunity,
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
