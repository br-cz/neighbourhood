import { Box, SimpleGrid } from '@mantine/core';
import { Comments } from '@/src/types/types';
import { CommentCard } from '@/src/components/Home/CommentCard/CommentCard';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

interface PostCommentListProps {
  comments: Comments;
  onDeleteComment?: (commentId: string) => void;
}

export function PostCommentList({ comments, onDeleteComment }: PostCommentListProps) {
  const { currentUser } = useCurrentUser();
  return (
    <Box w={750}>
      <SimpleGrid
        cols={1}
        spacing="lg"
        verticalSpacing={{ base: 'xs' }}
        data-testid="post-feed"
        mt="sm"
      >
        {comments?.items?.length > 0 &&
          comments.items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                isAuthor={comment.author?.id === currentUser?.id}
                onDeleteComment={(commentId: string) => onDeleteComment?.(commentId)}
              />
            ))}
      </SimpleGrid>
    </Box>
  );
}
