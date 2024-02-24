'use client';

import React from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { TestAllQueries } from '@/components/TestAllQueries';
import { useAuth } from '@/components/Authorization/useAuth';

export default function ProfilePage() {
  const { user: loggedIn, loading } = useAuth();

  if (!loggedIn) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <p>
        <TestAllQueries />
      </p>
    </NeighbourhoodShell>
  );
}
