import { Box, SimpleGrid } from '@mantine/core';
import { Comments } from '@/types/types';
import { CommentCard } from '@/components/CommentCard/CommentCard';

interface PostCommentListProps {
  comments: Comments;
}

export function PostCommentList({ comments }: PostCommentListProps) {
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
            .map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </SimpleGrid>
    </Box>
  );
}
