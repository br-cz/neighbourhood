import { sortByEventDate, sortByNewToOld } from '@/utils/sortUtils';
import { Event } from '@/types/types';
import { dateIsThisMonth, dateIsThisWeek, dateIsToday } from '@/utils/timeUtils';

export const filterAndSortEvents = (
  events: Event[],
  searchQuery: string,
  sortQuery: string | null
): Event[] => {
  let filteredEvents = events.filter(
    (event: Event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${event.organizer.firstName} ${event.organizer.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  switch (sortQuery) {
    case 'Newly Posted':
      filteredEvents.sort(sortByNewToOld);
      break;
    case 'Upcoming':
      filteredEvents.sort(sortByEventDate);
      break;
    case 'Today':
      filteredEvents = filteredEvents.filter((event) => dateIsToday(event.datetime));
      filteredEvents.sort(sortByEventDate);
      break;
    case 'This Week':
      filteredEvents = filteredEvents.filter((event) => dateIsThisWeek(event.datetime));
      filteredEvents.sort(sortByEventDate);
      break;
    case 'This Month':
      filteredEvents = filteredEvents.filter((event) => dateIsThisMonth(event.datetime));
      filteredEvents.sort(sortByEventDate);
      break;
    default:
      filteredEvents.sort(sortByNewToOld);
      break;
  }

  return filteredEvents;
};
