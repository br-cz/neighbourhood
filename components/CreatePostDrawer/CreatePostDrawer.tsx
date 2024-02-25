import React from 'react';
import { Drawer, Textarea, Button, Group, Select, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useCreatePost } from '@/src/api/postQueries';
import { Visibility } from '@/src/API';
import { useFormik } from 'formik';
import { createPostSchema } from './createPostValidation';
import classes from './CreatePostDrawer.module.css';

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
      title={<Title order={3}>New Post</Title>}
      padding="lg"
      size="md"
    >
      <form onSubmit={formik.handleSubmit}>
        {formik.touched.content && formik.errors.content ? (
          <div className={`${classes.errorMessage}`}>{formik.errors.content}</div>
        ) : null}
        <Textarea
          radius="md"
          autosize
          minRows={10}
          maxRows={10}
          label="Content"
          placeholder="Share your thoughts..."
          {...formik.getFieldProps('content')}
          required
        />

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...formik.getFieldProps('visibility')}
          mt="md"
          comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
        />

        <Group justify="center" mt="lg">
          <Button
            radius="md"
            type="button"
            onClick={() => {
              formik.setFieldTouched('content', true, false);
              formik.setFieldTouched('visibility', true, false);
              if (formik.isValid && !loading) {
                formik.submitForm();
              }
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
