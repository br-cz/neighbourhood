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

//placeholder data - remove when comments are implemented
const users = [
  {
    id: '1',
    firstName: 'Bojangle',
    lastName: 'Williams',
    profilePic: 'https://avatar.iran.liara.run/public/46',
  },
  {
    id: '2',
    firstName: 'LeJon',
    lastName: 'Brames',
    profilePic: 'https://avatar.iran.liara.run/public/37',
  },
];
const comments = [
  {
    id: '1',
    content: 'lol! so true. donkey is so funny.',
    createdAt: new Date().toISOString(),
    author: users[1],
  },
  {
    id: '2',
    content: 'ikr??? 😂',
    createdAt: new Date().toISOString(),
    author: users[0],
  },
];
const placeholderPosts = [
  {
    id: '30',
    content: 'Just watched Shrek 2 with my neighbours, best movie ever!',
    createdAt: new Date().toISOString(),
    author: users[0],
    comments,
  },
];

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading } = useFetchPosts(refresh);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const { user } = useAuth();
  if (!user) return null;
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(
    (post: Post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${post.author.firstName} ${post.author.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort(
    (a: { createdAt: Date }, b: { createdAt: Date }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Feed</Title>
        <Group>
          <Select radius="md" placeholder="Chronological" data={['Chronological']} />
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
          {/* <PostCard post={placeholderPosts[0]} />{' '} */}
          {/* placeholder - remove when comments are implemented */}
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
