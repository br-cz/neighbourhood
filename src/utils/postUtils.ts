import { Post } from '@/src/types/types';
import { sortByLikeCount, sortByNewToOld, sortByOldToNew } from '@/src/utils/sortUtils';
import { dateIsPast7Days, dateIsPast30Days } from '@/src/utils/timeUtils';

// Function to filter and sort posts
export const filterAndSortPosts = (
  posts: Post[],
  searchQuery: string,
  sortQuery: string | null
): Post[] => {
  let filteredPosts = posts.filter(
    (post: Post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${post.author.firstName} ${post.author.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  switch (sortQuery) {
    case 'Newly Posted':
      filteredPosts.sort(sortByNewToOld);
      break;
    case 'Oldest':
      filteredPosts.sort(sortByOldToNew);
      break;
    case 'Popular (This Week)':
      filteredPosts = filteredPosts.filter((post) => dateIsPast7Days(post.createdAt));
      filteredPosts.sort(sortByLikeCount);
      break;
    case 'Popular (This Month)':
      filteredPosts = filteredPosts.filter((post) => dateIsPast30Days(post.createdAt));
      filteredPosts.sort(sortByLikeCount);
      break;
    case 'Popular (All Time)':
      filteredPosts.sort(sortByLikeCount);
      break;
    default:
      filteredPosts.sort(sortByNewToOld);
      break;
  }

  return filteredPosts;
};
