'use client';

import React from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';

export default function MainPage() {
  const { user, loading } = useAuth();

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <h1>landing page</h1>
    </NeighbourhoodShell>
  );
}
