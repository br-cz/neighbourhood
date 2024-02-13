'use client';

import React from 'react';
import { Group, Select, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';

export default function PeoplePage() {
  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>People</Title>
        <Group>
          <Select radius="md" placeholder="Alphabetical" data={['Alphabetical', 'New Members']} />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<IconSearch />}
            placeholder="Search..."
          />
        </Group>
      </Group>
    </NeighbourhoodShell>
  );
}
