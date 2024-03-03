import { useState } from 'react';
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
import { useCreateComment } from '@/src/hooks/postsCustomHooks';
import { PostCommentList } from './PostCommentList';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [comments, setComments] = useState(post.comments.items);
  const [commentOpened, { toggle: toggleComment }] = useDisclosure(false);
  const [likeOpened, { toggle: toggleLike }] = useDisclosure(false);
  const { handleCreateComment } = useCreateComment();

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
      toggleComment();
      formik.resetForm();
    },
  });

  const handleLike = () => {
    //Mutation to like post
    toggleLike();
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
          variant={likeOpened ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faHeart} />}
          onClick={handleLike}
        >
          {likeOpened ? 'Liked' : 'Like'}
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
                        message: errors.content,
                      });
                    }
                  });
                }}
              >
                <FontAwesomeIcon size="xs" icon={faArrowRight} />
              </ActionIcon>
            }
          />
        </form>
      </Collapse>
      <PostCommentList comments={{ items: comments }} />
    </Box>
  );
}
