import {
  filterEventsForToday,
  filterEventsForWeek,
  sortByNewToOld,
  filterEventsForNextWeek,
} from '@/utils/sortUtils';
import { Event } from '@/src/API';

export const filterAndSortEvents = (
  events: Event[],
  searchQuery: string,
  sortQuery: string | null
): Event[] => {
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${event.organizer.firstName} ${event.organizer.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const eventsToSort = (() => {
    switch (sortQuery) {
      case 'Today':
        return filterEventsForToday(events);
      case 'This Week':
        return filterEventsForWeek(events);
      case 'Next Week':
        return filterEventsForNextWeek(events);
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
