'use client';

import React from 'react';
import { Group, Select, TextInput, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
          <Select radius="md" placeholder="Alphabetical" data={['Alphabetical', 'New Members']} />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            placeholder="Search..."
          />
        </Group>
      </Group>
      <UserList />
    </NeighbourhoodShell>
  );
}
