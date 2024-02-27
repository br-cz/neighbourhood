import { Text, Avatar, Group, Button, Box } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import classes from './PostCard.module.css';
import { Post } from '@/src/API';
import { formatPostedAt } from '@/utils/timeUtils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Box className={classes.post} data-testid="post-card">
      <Group align="center" gap="xs">
        <Avatar src={post.author.profilePic} alt="Profile Pic" radius="xl" size={32} />
        <Text size="sm" fw={600}>
          {post.author.firstName} {post.author.lastName}
        </Text>
        <Text size="xs" c="dimmed">
          {formatPostedAt(post.createdAt)}
        </Text>
      </Group>
      <Text mt="xs" size="sm">
        {post.content}
      </Text>
      <Group mt="sm">
        <Button size="compact-xs" radius="md" leftSection={<FontAwesomeIcon icon={faHeart} />}>
          Like
        </Button>
        <Button size="compact-xs" radius="md" leftSection={<FontAwesomeIcon icon={faComment} />}>
          Comment
        </Button>
      </Group>
    </Box>
  );
}
