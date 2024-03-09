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
import { Post } from '@/types/types';
import { filterAndSortPosts } from '@/components/utils/postUtils';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading } = useFetchPosts(refresh);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const { user } = useAuth();
  const [sortQuery, setSortQuery] = useState<string | null>(null);

  if (!user) return null;
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAndSortedPosts = filterAndSortPosts(posts, searchQuery, sortQuery);
  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Feed</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Sort by..."
            onChange={setSortQuery}
            value={sortQuery}
            data={['Date: New to Old', 'Date: Old to New', 'First Name: (A-Z)', 'Last Name: (A-Z)']}
          />
          <TextInput
            radius="md"
            value={searchQuery}
            onChange={handleSearchChange}
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
          {filteredAndSortedPosts.map((post: Post) => (
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
