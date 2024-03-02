import { Text, Avatar, Group, Box } from '@mantine/core';
import classes from './CommentCard.module.css';
import { formatPostedAt } from '@/utils/timeUtils';
import { Comments } from '@/types/types';

interface CommentCardProps {
  comment: Comments;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <Box className={classes.comment} data-testid="post-card">
      <Group align="center" gap="lg">
        <Group align="center" gap="xs">
          <Avatar src={comment?.author?.profilePic} alt="Profile Pic" radius="xl" size={24} />
          <Text fz="xs" fw={600}>
            {comment?.author?.firstName} {comment?.author?.lastName}
          </Text>
        </Group>
        <Text fz="xs">{comment?.content}</Text>
        <Text fz="xs" c="dimmed">
          {formatPostedAt(comment?.createdAt)}
        </Text>
      </Group>
    </Box>
  );
}
