import { Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { PostCard } from '@/components/Home//PostCard/PostCard';
import { useFetchPosts, useUserLikes } from '@/src/hooks/postsCustomHooks';
import { filterAndSortPosts } from '@/components/utils/postUtils';
import { Post } from '@/types/types';

export function PostFeed({
  refresh,
  searchQuery,
  sortQuery,
  onUpdate,
}: {
  refresh: boolean;
  searchQuery: string;
  sortQuery: string | null;
  onUpdate?: () => void;
}) {
  const { posts, loading } = useFetchPosts(refresh);
  const { userLikes } = useUserLikes();
  const filteredAndSortedPosts = filterAndSortPosts(posts, searchQuery, sortQuery);

  return (
    <>
      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : posts.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="lg" c="dimmed">
            No one has shared anything yet in this community, be the first one to share!
          </Text>
        </Group>
      ) : filteredAndSortedPosts.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="lg" c="dimmed">
            There is no post that matches your search query.
          </Text>
        </Group>
      ) : (
        <SimpleGrid
          cols={1}
          spacing="lg"
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          data-testid="post-feed"
        >
          {filteredAndSortedPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={userLikes.get(post.id)}
              onUpdate={onUpdate}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
