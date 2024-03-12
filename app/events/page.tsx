'use client';

import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Loader, Select, SimpleGrid, TextInput, Title, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from '@/components/EventCard/EventCard';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { CreateEventDrawer } from '@/components/CreateEventDrawer/CreateEventDrawer';
import { ViewEventModal } from '@/components/ViewEventModal/ViewEventModal';
import { useAuth } from '@/components/Authorization/useAuth';
import { useFetchEvents } from '@/src/hooks/eventsCustomHooks';
import { Event } from '@/types/types';
import { filterAndSortEvents } from '@/components/utils/eventUtils';

export default function EventsPage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const [viewEventModalOpened, setViewEventModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();
  const { events, loading } = useFetchEvents(refresh);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const [sortQuery, setSortQuery] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortQuery);

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setViewEventModalOpened(true);
  };

  if (!user) return null;

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Events</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Newly Posted"
            onChange={setSortQuery}
            value={sortQuery}
            data={['Newly Posted', 'Today', 'This Week', 'This Month']}
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

      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : events.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="xl" c="dimmed">
            No one is hosting an event yet, be the first one!
          </Text>
        </Group>
      ) : filteredAndSortedEvents.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="xl" c="dimmed">
            There is no event that matches your search query
          </Text>
        </Group>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: 5, sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          data-testid="event-feed"
        >
          {filteredAndSortedEvents.map((event: Event) => (
            <EventCard key={event.id} event={event} onView={() => handleViewEvent(event)} />
          ))}
        </SimpleGrid>
      )}

      <CreateEventDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />

      {selectedEvent && (
        <ViewEventModal
          opened={viewEventModalOpened}
          onClose={() => setViewEventModalOpened(false)}
          event={selectedEvent}
        />
      )}
    </NeighbourhoodShell>
  );
}
