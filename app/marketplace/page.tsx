'use client';

import React from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';

export default function MarketplacePage() {
  const { user, loading } = useAuth();

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Marketplace</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Newly Listed"
            data={['Newly Listed', 'Price: Low to High', 'Price: High to Low']}
          />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<IconSearch />}
            placeholder="Search..."
          />
          <Button radius="md" variant="filled">
            New Listing...
          </Button>
        </Group>
      </Group>
    </NeighbourhoodShell>
  );
}
