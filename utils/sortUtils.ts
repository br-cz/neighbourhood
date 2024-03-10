import { combineDateTime } from './timeUtils';
import { Event } from '@/src/API';

export function sortByFirstName(a: any, b: any): number {
  const nameA = a?.firstName?.toLowerCase();
  const nameB = b?.firstName?.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function sortByLastName(a: any, b: any): number {
  const nameA = a?.lastName?.toLowerCase();
  const nameB = b?.lastName?.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function sortByNewToOld(a: any, b: any): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function sortByOldToNew(a: any, b: any): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function filterEventsForToday(events: Event[]): Event[] {
  const today = new Date();
  // startOfToday.setHours(0, 0, 0, 0);   //Enabling this will cause you to see events that may have already passed, not sure if we want that

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return events.filter((events) => {
    const eventDate = new Date(events.datetime);
    return eventDate >= today && eventDate <= endOfToday;
  });
}

export function filterEventsForWeek(events: Event[]): Event[] {
  const today = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  return events.filter((event) => {
    const eventDate = new Date(event.datetime);
    return eventDate >= today && eventDate < endOfWeek;
  });
}

export function filterEventsForNextWeek(events: Event[]): Event[] {
  const startOfNextWeek = new Date();
  startOfNextWeek.setDate(startOfNextWeek.getDate() - startOfNextWeek.getDay() + 7);
  startOfNextWeek.setHours(0, 0, 0, 0);
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(endOfNextWeek.getDate() + 7);
  endOfNextWeek.setHours(23, 59, 59, 999);
  return events.filter((event) => {
    const eventDate = new Date(event.datetime);
    return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek;
  });
}
