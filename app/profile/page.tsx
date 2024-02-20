'use client';

import React from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/components/Authorization/useAuth';

export default function ProfilePage() {
  const { user } = useData();
  const { user: loggedIn, loading } = useAuth();

  if (!loggedIn) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <p>
        {user?.firstName} {user?.lastName}
      </p>
    </NeighbourhoodShell>
  );
}
