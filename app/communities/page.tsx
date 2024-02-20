'use client';

import React from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';

export default function CommunitiesPage() {
  const { user, loading } = useAuth();

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <p>Communities</p>
    </NeighbourhoodShell>
  );
}
