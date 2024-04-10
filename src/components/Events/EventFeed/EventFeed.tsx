import { useState } from 'react';
import { Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { useFetchEvents, useUserEventSaves } from '@/src/hooks/eventsCustomHooks';
import { filterAndSortEvents } from '@/src/utils/eventUtils';
import { Event } from '@/src/types/types';
import { EventCard } from '@/src/components/Events/EventCard/EventCard';
import { ViewEventModal } from '@/src/components/Events/ViewEventModal/ViewEventModal';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export function EventFeed({
  refresh,
  searchQuery,
  sortQuery,
  onUpdate,
}: {
  refresh: boolean;
  searchQuery: string;
  sortQuery: string | null;
  onUpdate: () => void;
}) {
  const { events, loading } = useFetchEvents(refresh);
  const { saves } = useUserEventSaves(refresh);
  const { currentUser } = useCurrentUser();
  const [viewEventModalOpened, setViewEventModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const filteredAndSortedEvents = filterAndSortEvents(events, searchQuery, sortQuery, saves);
  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setViewEventModalOpened(true);
  };

  return (
    <>
      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : events.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="lg" c="dimmed">
            No one is hosting an event yet, be the first one!
          </Text>
        </Group>
      ) : filteredAndSortedEvents.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="lg" c="dimmed">
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
            <EventCard
              key={event.id}
              event={event}
              isSaved={saves ? saves.get(event.id) : false}
              isOrganizer={event.organizer?.id === currentUser?.id}
              onView={() => handleViewEvent(event)}
              onUpdate={onUpdate}
            />
          ))}
        </SimpleGrid>
      )}
      {selectedEvent && (
        <ViewEventModal
          opened={viewEventModalOpened}
          onClose={() => setViewEventModalOpened(false)}
          event={selectedEvent}
        />
      )}
    </>
  );
}
