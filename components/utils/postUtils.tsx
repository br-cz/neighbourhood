import { Post } from '@/types/types';
import { sortByNewToOld, sortByOldToNew } from '@/utils/sortUtils';

// Function to filter and sort posts
export const filterAndSortPosts = (
  posts: Post[],
  searchQuery: string,
  sortQuery: string | null
): Post[] => {
  const filteredPosts = posts.filter(
    (post: Post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${post.author.firstName} ${post.author.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a: Post, b: Post) => {
    switch (sortQuery) {
      case 'Oldest':
        return sortByOldToNew(a, b);
      case 'Newly Posted':
        return sortByNewToOld(a, b);
      default:
        return sortByNewToOld(a, b);
    }
  });

  return sortedPosts;
};
