export function timeAgo(isoDate: string): string {
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
