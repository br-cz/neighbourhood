'use client';

import React, { useState } from 'react';
import { Group, Select, TextInput, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { UserList } from '@/components/UserList/UserList';
import { useAuth } from '@/components/Authorization/useAuth';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<string | null>('First Name (A-Z)');
  const { user } = useAuth();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>People</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Sort by..."
            onChange={setSortQuery}
            data={['First Name (A-Z)', 'Last Name (A-Z)', 'Recently Joined']}
            defaultValue="First Name (A-Z)"
          />
          <TextInput
            radius="md"
            value={searchQuery}
            onChange={handleSearchChange}
            rightSectionPointerEvents="none"
            rightSection={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Search..."
          />
        </Group>
      </Group>
      <UserList searchQuery={searchQuery} sortQuery={sortQuery} />
    </NeighbourhoodShell>
  );
}
