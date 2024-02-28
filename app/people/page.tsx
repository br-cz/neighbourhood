'use client';

import React from 'react';
import { Group, Select, Title } from '@mantine/core';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { UserList } from '@/components/UserList/UserList';
import { useAuth } from '@/components/Authorization/useAuth';

export default function PeoplePage() {
  const { user, loading } = useAuth();

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>People</Title>
        <Group>
          <Select radius="md" placeholder="Relationship" data={['Relationship']} />
        </Group>
      </Group>
      <UserList />
    </NeighbourhoodShell>
  );
}
