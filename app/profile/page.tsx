'use client';

import React from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useData } from '@/contexts/DataContext';

export default function ProfilePage() {
  const { user } = useData();
  return (
    <NeighbourhoodShell>
      <p>
        {user?.firstName} {user?.lastName}
      </p>
    </NeighbourhoodShell>
  );
}
