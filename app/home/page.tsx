'use client';

import React from 'react';
import { Button, Group, Select, SimpleGrid, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { CreatePostDrawer } from '@/components/CreatePostDrawer/CreatePostDrawer';
import { PostCard } from '@/components/PostCard/PostCard';

// Placeholder data until we have our data figured out
const users = {
  1: {
    name: 'Demessie Amede',
    username: 'damede',
    profilePic: 'https://avatar.iran.liara.run/public/19',
    relationshipStatus: 'incoming',
  },
  2: {
    name: 'Gurman Toor',
    username: 'gtoor',
    profilePic: 'https://avatar.iran.liara.run/public/3',
    relationshipStatus: 'none',
  },
  3: {
    name: 'Bricz Cruz',
    username: 'bcruz',
    profilePic: 'https://avatar.iran.liara.run/public/15',
    relationshipStatus: 'friend',
  },
  4: {
    name: 'Safran Bin Kader',
    username: 'sbkader',
    profilePic: 'https://avatar.iran.liara.run/public/10',
    relationshipStatus: 'none',
  },
  5: {
    name: 'Alborz Khakbazan',
    username: 'alborzk',
    profilePic: 'https://avatar.iran.liara.run/public/5',
    relationshipStatus: 'none',
  },
};

const posts = {
  1: {
    author: users[2],
    content: "Anyone else have pets? Let's walk our dogs together! :)",
    postedAt: '10m ago',
  },
  2: {
    author: users[4],
    content:
      "Okay so I've been thinking... what if we did a street-wide yard sale? Anyone else down?? Would be able to finally get rid of all this junk in my garage",
    postedAt: '1h ago',
  },
  3: {
    author: users[3],
    content: 'where is my lawnmower',
    postedAt: '5h ago',
  },
};

export default function HomePage() {
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const { user, loading } = useAuth();
  if (!user) return null; // or a message indicating the user is not signed in

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
          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Post...
          </Button>
        </Group>
      </Group>
      <SimpleGrid cols={1} spacing="lg" verticalSpacing={{ base: 'md', sm: 'lg' }}>
        {Object.entries(posts).map(([id, post]) => (
          <PostCard key={id} post={post} />
        ))}
      </SimpleGrid>
      <CreatePostDrawer opened={drawerOpened} onClose={drawerHandlers.close} />
    </NeighbourhoodShell>
  );
}
