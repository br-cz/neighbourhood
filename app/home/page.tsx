'use client';

import React from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { getUser } from '@/src/graphql/queries';

const client = generateClient({});

export default function HomePage() {
  async function handleClick() {
    try {
      const { userId } = await getCurrentUser();
      console.log('Currently logged in user ID from Cognito:', userId);
      const user = await client.graphql({
        query: getUser,
        variables: { id: userId },
      });
      console.log('User retrieved from Database:', user.data.getUser);
      localStorage.setItem('userData', JSON.stringify(user.data.getUser));
    } catch (err) {
      console.log(err);
    }
  }

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
          <Button radius="md" variant="filled" onClick={handleClick}>
            New Post...
          </Button>
        </Group>
      </Group>
    </NeighbourhoodShell>
  );
}
