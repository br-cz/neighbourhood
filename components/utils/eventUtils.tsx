import {
  filterEventsForThisMonth,
  filterEventsForToday,
  filterEventsForWeek,
  filterSavedEvents,
  sortByNewToOld,
} from '@/utils/sortUtils';
import { Event } from '@/types/types';

export const filterAndSortEvents = (
  events: Event[],
  searchQuery: string,
  sortQuery: string | null,
  userEventSaves: Map<string, boolean>
): Event[] => {
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${event.organizer.firstName} ${event.organizer.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const eventsToSort = (() => {
    switch (sortQuery) {
      case 'Today':
        return filterEventsForToday(filteredEvents);
      case 'This Week':
        return filterEventsForWeek(filteredEvents);
      case 'This Month':
        return filterEventsForThisMonth(filteredEvents);
      case 'Saved':
        return filterSavedEvents(filteredEvents, userEventSaves);
      default:
        return filteredEvents;
    }
  })();

  const sortedEvents = eventsToSort.sort((a, b) => {
    switch (sortQuery) {
      case 'Newly Posted':
        return sortByNewToOld(a, b);
      default:
        return sortByNewToOld(a, b);
    }
  });

  return sortedEvents;
};
