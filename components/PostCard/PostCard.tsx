import { Text, Avatar, Group, Button } from '@mantine/core';
import classes from './PostCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className={classes.post}>
      <Group align="center" gap="xs">
        <Avatar src={post.author.profilePic} alt="Profile Pic" radius="xl" size={32} />
        <Text size="sm" fw={600}>
          {post.author.name}
        </Text>
        <Text size="xs" c="dimmed">
          {post.postedAt}
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
    </div>
  );
}
