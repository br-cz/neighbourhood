import { Post } from '@/types/types';
import { sortByNewToOld, sortByOldToNew, sortByFirstName, sortByLastName } from '@/utils/sortUtils';

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
      case 'Date: Old to New':
        return sortByOldToNew(a, b);
      case 'Date: New to Old':
        return sortByNewToOld(a, b);
      case 'First Name: (A-Z)':
        return sortByFirstName(a.author, b.author);
      case 'Last Name: (A-Z)':
        return sortByLastName(a.author, b.author);
      default:
        return sortByNewToOld(a, b);
    }
  });

  return sortedPosts;
};
