'use client';

import React from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';

export default function HomePage() {
  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Bridgwater Lakes</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Chronological"
            data={['Chronological', 'Popular Today', 'Popular This Week', 'Friends Only']}
          />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<IconSearch />}
            placeholder="Search..."
          />
          <Button radius="md" variant="filled">
            New Post...
          </Button>
        </Group>
      </Group>
    </NeighbourhoodShell>
  );
}
