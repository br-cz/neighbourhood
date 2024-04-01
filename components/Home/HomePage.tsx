'use client';

import React, { useState } from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { CreatePostDrawer } from '@/components/Home/CreatePostDrawer/CreatePostDrawer';
import { PostFeed } from '@/components/Home/PostFeed/PostFeed';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const [sortQuery, setSortQuery] = useState<string | null>(null);
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Group justify="space-between" m="20">
        <Title order={1}>Feed</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Sort by..."
            defaultValue="Newly Posted"
            onChange={setSortQuery}
            data={[
              'Newly Posted',
              'Oldest',
              'Popular (This Week)',
              'Popular (This Month)',
              'Popular (All Time)',
            ]}
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
      <PostFeed
        refresh={refresh}
        searchQuery={searchQuery}
        sortQuery={sortQuery}
        onUpdate={toggleRefresh}
      />
      <CreatePostDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />
    </>
  );
}
