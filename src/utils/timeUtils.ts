import { DateValue } from '@mantine/dates';

export function isoToUTC(isoDate: string): string {
  return new Date(isoDate).toUTCString();
}

export function utcToISO(date: DateValue): string {
  if (!date) return '';
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function formatUTCDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function getAge(isoDate: string): string {
  const now = new Date();
  const birthday = new Date(isoDate);
  const diffInSeconds = Math.floor((now.getTime() - birthday.getTime()) / 1000);
  let result = '';
  result = `${Math.floor(diffInSeconds / 31556952)}`;
  return result;
}

export function formatPostedAt(isoDate: string): string {
  const now = new Date();
  const postedAt = new Date(isoDate);
  const diffInSeconds = Math.floor((now.getTime() - postedAt.getTime()) / 1000);
  let result = '';

  if (diffInSeconds < 60) {
    result = 'Just now';
  } else if (diffInSeconds < 3600) {
    result = `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    result = `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else if (diffInSeconds < 604800) {
    result = `${Math.floor(diffInSeconds / 86400)}d ago`;
  } else if (diffInSeconds < 2629746) {
    result = `${Math.floor(diffInSeconds / 604800)}w ago`;
  } else if (diffInSeconds < 31556952) {
    result = `${Math.floor(diffInSeconds / 2629746)}mo ago`;
  } else if (diffInSeconds < 157784630) {
    result = `${Math.floor(diffInSeconds / 31556952)}y ago`;
  } else {
    result = 'A long time ago';
  }

  return result;
}

export function combineDateTime(date: Date, time: string) {
  const dateTime = new Date(date);
  let timeToParse = time;

  if (time === '') {
    timeToParse = '00:00';
  }

  //Given the HH:MM format, we parse each into a proper number
  const [hours, minutes] = timeToParse.split(':').map((num) => parseInt(num, 10));

  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);
  dateTime.setSeconds(0); // Reset seconds to 0, not necessary but makes things more consistent

  return dateTime.toISOString();
}

export function dateIsToday(isoDate: string): boolean {
  const date = new Date(isoDate);
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function dateIsThisWeek(isoDate: string): boolean {
  const date = new Date(isoDate);
  const now = new Date();
  const firstDayOfWeek = new Date(
    now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))
  );
  firstDayOfWeek.setHours(0, 0, 0, 0);

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 999);

  return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

export function dateIsThisMonth(isoDate: string): boolean {
  const date = new Date(isoDate);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  return date >= firstDayOfMonth && date <= lastDayOfMonth;
}

export function dateIsThisYear(isoDate: string): boolean {
  const date = new Date(isoDate);
  const now = new Date();
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(now.getFullYear() + 1, 0, 0, 23, 59, 59, 999);

  return date >= firstDayOfYear && date <= lastDayOfYear;
}

export function dateIsPast7Days(isoDate: string): boolean {
  const now = new Date();
  const date = new Date(isoDate);
  const diffInTime = now.getTime() - date.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays <= 7 && diffInDays >= 0;
}

export function dateIsPast30Days(isoDate: string): boolean {
  const now = new Date();
  const date = new Date(isoDate);
  const diffInTime = now.getTime() - date.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays <= 30 && diffInDays >= 0;
}
