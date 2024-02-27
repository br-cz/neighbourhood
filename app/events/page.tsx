'use client';

import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Loader, Select, SimpleGrid, Title } from '@mantine/core';
import { EventCard } from '@/components/EventCard/EventCard';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { CreateEventDrawer } from '@/components/CreateEventDrawer/CreateEventDrawer';
import { ViewEventModal } from '@/components/ViewEventModal/ViewEventModal';
import { useAuth } from '@/components/Authorization/useAuth';
import { useFetchEvents } from '@/src/hooks/eventsCustomHooks';
import { Event } from '@/src/API';

export default function EventsPage() {
  const [refresh, setRefresh] = useState(false);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const [viewEventModalOpened, setViewEventModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();
  const { events, loading } = useFetchEvents(refresh);
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const sortedEvents = events.sort(
    (a: { createdAt: Date }, b: { createdAt: Date }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
          <Select radius="md" placeholder="Newly Posted" data={['Newly Posted']} />
          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Event...
          </Button>
        </Group>
      </Group>

      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: 5, sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
        >
          {sortedEvents.map((event: Event) => (
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
