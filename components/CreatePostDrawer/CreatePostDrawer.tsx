import React from 'react';
import { Drawer, Textarea, Button, Group, Select, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreatePostDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export function CreatePostDrawer({ opened, onClose }: CreatePostDrawerProps) {
  const form = useForm({
    initialValues: {
      content: '',
      visibility: 'public',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
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
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          handleClose();
        })}
      >
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
          required
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[
            { value: 'public', label: 'Public' },
            { value: 'friends_only', label: 'Friends Only' },
          ]}
          {...form.getInputProps('visibility')}
          mt="md"
        />

        <Group justify="center" mt="lg">
          <Button radius="md" type="submit" onClick={onClose}>
            Post
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
