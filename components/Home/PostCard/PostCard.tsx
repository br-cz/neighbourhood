import { useState, useEffect } from 'react';
import {
  Text,
  Avatar,
  Group,
  Box,
  Button,
  Collapse,
  TextInput,
  ActionIcon,
  Title,
} from '@mantine/core';
import { useFormik } from 'formik';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostCommentList } from './PostCommentList';
import { createCommentSchema } from './createCommentSchema';
import { formatPostedAt } from '@/utils/timeUtils';
import { useCreateComment, useDeletePost, usePostLikes } from '@/src/hooks/postsCustomHooks';
import { Post } from '@/types/types';
import classes from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  isLiked?: boolean;
  isAuthor?: boolean;
  onUpdate?: () => void;
}

export function PostCard({ post, isLiked, isAuthor, onUpdate }: PostCardProps) {
  const profilePic = post.author?.profilePic || './img/placeholder-profile.jpg';
  const { handleDeletePost } = useDeletePost();
  const { likePost, unlikePost } = usePostLikes(post.id);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [comments, setComments] = useState(post?.comments?.items);
  const [commentOpened, { toggle: toggleComment }] = useDisclosure(false);
  const { handleCreateComment } = useCreateComment();

  useEffect(() => {
    setLiked(isLiked!);
  }, [isLiked]);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: createCommentSchema,
    onSubmit: async (parameters) => {
      const commentData = {
        content: parameters.content,
        postCommentsId: post.id,
      };
      const newComment = await handleCreateComment(commentData);
      setComments([...comments, newComment]);
      formik.resetForm();
    },
  });

  const handleDelete = () => {
    handleDeletePost(post);
    onUpdate?.();
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Delete post?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to delete your post? This action cannot be undone.
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red.6' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Delete', cancel: 'Back' },
      onConfirm: () => handleDelete(),
    });
  };

  const handleLike = async () => {
    if (liked) {
      setLikeCount(likeCount! - 1);
      setLiked(false);
      await unlikePost();
    } else {
      setLikeCount(likeCount! + 1);
      setLiked(true);
      await likePost();
    }
  };

  return (
    <Box className={classes.post} data-testid="post-card">
      <Group align="center" gap="xs">
        <Avatar src={profilePic} alt="Profile Pic" radius="xl" size={32} />
        <Text size="sm" fw={600}>
          {post.author.firstName} {post.author.lastName}
        </Text>
        <Text size="xs" c="dimmed">
          {formatPostedAt(post.createdAt)}
        </Text>
        {isAuthor && (
          <ActionIcon
            color="red.6"
            radius="xl"
            variant="subtle"
            size="sm"
            onClick={openDeleteModal}
            data-testid="delete-post-btn"
          >
            <FontAwesomeIcon icon={faTrash} size="xs" />
          </ActionIcon>
        )}
      </Group>
      <Text mt="xs" size="sm">
        {post.content}
      </Text>
      <Group mt="sm">
        <Button
          size="xs"
          radius="md"
          variant={liked || isLiked ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faHeart} />}
          onClick={handleLike}
          data-testid="like-button"
        >
          {liked || isLiked ? 'Liked' : 'Like'}
        </Button>
        <Button
          size="xs"
          radius="md"
          variant={commentOpened ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faComment} />}
          onClick={toggleComment}
        >
          Comment
        </Button>
      </Group>
      <Collapse in={commentOpened} mt="sm">
        <form>
          <Box w={500}>
            <TextInput
              name="content"
              placeholder="Write a comment..."
              radius="lg"
              size="sm"
              onChange={formik.handleChange}
              value={formik.values.content}
              data-testid="comment-input"
              rightSectionWidth={42}
              rightSection={
                <ActionIcon
                  size={24}
                  radius="xl"
                  color="dark.6"
                  variant="light"
                  data-testid="submit-comment"
                  onClick={() => {
                    formik.validateForm().then((errors) => {
                      console.log(errors);
                      if (Object.keys(errors).length === 0) {
                        formik.submitForm();
                      } else {
                        notifications.show({
                          radius: 'md',
                          color: 'red',
                          title: 'Oops!',
                          message: 'Failed to post your comment, please try again.',
                        });
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon size="xs" icon={faArrowRight} />
                </ActionIcon>
              }
            />
          </Box>
        </form>
      </Collapse>
      <PostCommentList comments={{ items: comments }} />
    </Box>
  );
}
