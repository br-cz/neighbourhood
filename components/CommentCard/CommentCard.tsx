import { useEffect, useState } from 'react';
import { Text, Avatar, Group, Box } from '@mantine/core';
import classes from './CommentCard.module.css';
import { formatPostedAt } from '@/utils/timeUtils';
import { CommentItem } from '@/types/types';
import { retrieveImage } from '../utils/s3Helpers/UserProfilePictureS3Helper';

interface CommentCardProps {
  comment: CommentItem;
}

export function CommentCard({ comment }: CommentCardProps) {
  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    if (!comment?.author) return;
    retrieveImage(comment?.author?.id).then((image) => {
      setProfilePic(image);
    });
  }, [comment?.author?.profilePic]);

  return (
    <Box className={classes.comment} data-testid="comment-card">
      <Group align="center" gap="lg">
        <Group align="center" gap="xs">
          <Avatar src={profilePic} alt="Profile Pic" radius="xl" size={24} />
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
