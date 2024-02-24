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

export function combineDateTime(date: Date, time: string): string {
  const datetime = new Date(date);
  const [hours, minutes] = time.split(':').map(Number);
  datetime.setHours(hours, minutes);
  return datetime.toISOString();
}
