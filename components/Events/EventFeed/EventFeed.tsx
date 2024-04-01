import { useState } from 'react';
import { Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { useFetchEvents, useUserEventSaves } from '@/src/hooks/eventsCustomHooks';
import { filterAndSortEvents } from '@/components/utils/eventUtils';
import { Event } from '@/types/types';
import { EventCard } from '@/components/Events/EventCard/EventCard';
import { ViewEventModal } from '@/components/Events/ViewEventModal/ViewEventModal';

export function EventFeed({
  refresh,
  searchQuery,
  sortQuery,
}: {
  refresh: boolean;
  searchQuery: string;
  sortQuery: string | null;
}) {
  const { events, loading } = useFetchEvents(refresh);
  const { userEventSaves } = useUserEventSaves();
  const [viewEventModalOpened, setViewEventModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const filteredAndSortedEvents = filterAndSortEvents(
    events,
    searchQuery,
    sortQuery,
    userEventSaves
  );
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
              onView={() => handleViewEvent(event)}
              isSaved={userEventSaves.get(event.id)}
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
