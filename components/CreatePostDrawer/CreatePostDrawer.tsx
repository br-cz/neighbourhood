import React from 'react';
import { Drawer, Textarea, Button, Group, Select, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useCreatePost } from '@/src/api/postQueries';
import { Visibility } from '@/src/API';

interface CreatePostDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreatePostDrawer({ opened, onClose, onPostCreated }: CreatePostDrawerProps) {
  const [loading, handlers] = useDisclosure();
  const { handleCreatePost } = useCreatePost();
  const form = useForm({
    initialValues: {
      content: '',
      visibility: Visibility.PUBLIC,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: typeof form.values) => {
    handlers.open();
    await handleCreatePost(values);
    onPostCreated();
    handlers.close();
    handleClose();
  };

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={handleClose}
      position="right"
      title={<Title order={3}>New Post</Title>}
      padding="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          radius="md"
          autosize
          minRows={10}
          maxRows={10}
          label="Content"
          placeholder="Share your thoughts..."
          {...form.getInputProps('content')}
        />

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...form.getInputProps('visibility')}
          mt="md"
        />

        <Group justify="center" mt="lg">
          <Button radius="md" type="submit" onClick={onClose} loading={loading}>
            Post
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
