import { Text, Avatar, Group, Box, ActionIcon, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatPostedAt } from '@/src/utils/timeUtils';
import { useDeleteComment } from '@/src/hooks/postsCustomHooks';
import { CommentItem } from '@/src/types/types';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import classes from './CommentCard.module.css';

interface CommentCardProps {
  comment: CommentItem;
  isAuthor?: boolean;
  onDeleteComment?: (commentId: string) => void;
}

export function CommentCard({ comment, isAuthor, onDeleteComment }: CommentCardProps) {
  const { currentUser } = useCurrentUser();
  const { handleDeleteComment } = useDeleteComment();
  let profilePic = comment.author?.profilePic || './img/placeholder-profile.jpg';

  if (isAuthor) {
    profilePic = currentUser?.profilePic;
  }

  const handleDelete = () => {
    handleDeleteComment(comment);
    onDeleteComment?.(comment.id);
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Delete comment?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to delete your comment? This action cannot be undone.
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red.6' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Delete', cancel: 'Back' },
      onConfirm: () => handleDelete(),
    });
  };

  return (
    <Box className={classes.comment} data-testid="comment-card">
      <Group align="center" justify="space-between">
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
        {isAuthor && (
          <Tooltip label="Delete comment">
            <ActionIcon
              color="red.7"
              radius="md"
              variant="subtle"
              size="sm"
              onClick={openDeleteModal}
              data-testid="delete-comment-btn"
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Box>
  );
}
