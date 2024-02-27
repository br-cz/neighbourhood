'use client';

import React, { useState } from 'react';
import { Button, Group, Loader, Select, SimpleGrid, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { CreatePostDrawer } from '@/components/CreatePostDrawer/CreatePostDrawer';
import { PostCard } from '@/components/PostCard/PostCard';
import { useFetchPosts } from '@/src/hooks/postsCustomHooks';
import { Post } from '@/src/API';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const { posts, loading } = useFetchPosts(refresh);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const { user } = useAuth();
  if (!user) return null;
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const sortedPosts = posts.sort(
    (a: { createdAt: Date }, b: { createdAt: Date }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Feed</Title>
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
      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : (
        <SimpleGrid
          cols={1}
          spacing="lg"
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          data-testid="post-feed"
        >
          {sortedPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
      )}
      <CreatePostDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />
    </NeighbourhoodShell>
  );
}
