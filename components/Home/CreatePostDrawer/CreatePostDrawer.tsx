import React from 'react';
import { useFormik } from 'formik';
import { Drawer, Textarea, Button, Group, Select, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useCreatePost } from '@/src/hooks/postsCustomHooks';
import { Visibility } from '@/types/types';
import { createPostSchema } from './createPostValidation';

interface CreatePostDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreatePostDrawer({ opened, onClose, onPostCreated }: CreatePostDrawerProps) {
  const [loading, handlers] = useDisclosure();
  const { handleCreatePost } = useCreatePost();

  const formik = useFormik({
    initialValues: {
      content: '',
      visibility: Visibility.PUBLIC,
    },
    validationSchema: createPostSchema,
    onSubmit: async (values) => {
      handlers.open();
      await handleCreatePost(values);
      onPostCreated();
      handlers.close();
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
      position="right"
      title={
        <Title order={3} component="p" data-testid="new-post">
          New Post
        </Title>
      }
      padding="lg"
      size="md"
      data-testid="create-post-drawer"
    >
      <form onSubmit={formik.handleSubmit}>
        <Textarea
          radius="md"
          autosize
          minRows={10}
          maxRows={10}
          label="Content"
          placeholder="Share your thoughts..."
          {...formik.getFieldProps('content')}
          data-testid="post-content"
          required
        />

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[
            { value: Visibility.PUBLIC, label: 'Public' },
            { value: Visibility.FRIENDS_ONLY, label: 'Friends Only' },
          ]}
          value={formik.values.visibility}
          onChange={(value) => formik.setFieldValue('visibility', value)}
          mt="md"
          comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
        />

        <Group justify="center" mt="lg">
          <Button
            data-testid="post-button"
            radius="md"
            type="button"
            onClick={() => {
              formik.validateForm().then((errors) => {
                console.log(errors); // For logging
                if (Object.keys(errors).length === 0 && !loading) {
                  // No errors, form is valid so we submit
                  formik.submitForm();
                } else {
                  notifications.show({
                    radius: 'md',
                    color: 'red',
                    title: 'Oops!',
                    message: "Couldn't create your post - please type something in.",
                  });
                }
              });
            }}
            loading={loading}
          >
            Post
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
