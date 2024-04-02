'use client';

import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CreateEventDrawer } from '@/components/Events/CreateEventDrawer/CreateEventDrawer';
import { EventFeed } from './EventFeed/EventFeed';

export default function EventsPage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<string | null>(null);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (value: string | null) => {
    setSortQuery(value);
    if (value === 'Saved') {
      toggleRefresh();
    }
  };

  return (
    <>
      <Group justify="space-between" m="20">
        <Title order={1}>Events</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Sort by..."
            onChange={handleSortChange}
            defaultValue="Newly Posted"
            data={['Newly Posted', 'Upcoming', 'Today', 'This Week', 'This Month', 'Saved']}
          />
          <TextInput
            radius="md"
            value={searchQuery}
            onChange={handleSearchChange}
            rightSectionPointerEvents="none"
            rightSection={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Search..."
          />
          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Event...
          </Button>
        </Group>
      </Group>
      <EventFeed refresh={refresh} searchQuery={searchQuery} sortQuery={sortQuery} />
      <CreateEventDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />
    </>
  );
}
