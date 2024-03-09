import { useEffect, useState } from 'react';
import { Text, Avatar, Group, Box, Button, Collapse, TextInput, ActionIcon } from '@mantine/core';
import { useFormik } from 'formik';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types/types';
import { formatPostedAt } from '@/utils/timeUtils';
import classes from './PostCard.module.css';
import { createCommentSchema } from './createCommentSchema';
import { useCreateComment, usePostLikes } from '@/src/hooks/postsCustomHooks';
import { PostCommentList } from './PostCommentList';

interface PostCardProps {
  post: Post;
  isLiked: boolean;
}

export function PostCard({ post, isLiked }: PostCardProps) {
  const { likePost, unlikePost } = usePostLikes(post.id);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post.comments.items);
  const [commentOpened, { toggle: toggleComment }] = useDisclosure(false);
  const { handleCreateComment } = useCreateComment();

  useEffect(() => {
    setLiked(isLiked);
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

  const handleLike = async () => {
    if (liked) {
      await unlikePost();
      setLiked(false);
    } else {
      await likePost();
      setLiked(true);
    }
  };

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
        <Button
          size="xs"
          radius="md"
          variant={liked ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faHeart} />}
          onClick={handleLike}
        >
          {liked ? 'Liked' : 'Like'}
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
              rightSectionWidth={42}
              rightSection={
                <ActionIcon
                  size={24}
                  radius="xl"
                  color="dark.6"
                  variant="light"
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
