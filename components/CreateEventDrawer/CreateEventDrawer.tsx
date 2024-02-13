import {
  Drawer,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Text,
  rem,
  Stack,
  Title,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface CreateEventDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateEventDrawer({ opened, onClose }: CreateEventDrawerProps) {
  const form = useForm({
    initialValues: {
      eventName: '',
      eventDescription: '',
      location: '',
      date: null,
      time: null,
      visibility: '',
      eventImage: null,
    },
  });

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={onClose}
      position="right"
      title={<Title order={3}>New Event</Title>}
      padding="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          radius="md"
          label="Event Name"
          placeholder="Enter event name"
          {...form.getInputProps('eventName')}
        />

        <Textarea
          radius="md"
          autosize
          minRows={4}
          maxRows={4}
          label="Event Description"
          placeholder="Describe your event"
          {...form.getInputProps('eventDescription')}
          mt="md"
        />

        <TextInput
          required
          radius="md"
          label="Location"
          placeholder="Event location"
          {...form.getInputProps('location')}
          mt="md"
        />

        <DatePickerInput
          required
          radius="md"
          label="Date"
          placeholder="Pick a date"
          {...form.getInputProps('date')}
          mt="md"
        />

        <TimeInput
          required
          radius="md"
          label="Time"
          placeholder="Select time"
          {...form.getInputProps('time')}
          mt="md"
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

        <Dropzone
          onDrop={(files) => form.setFieldValue('eventImage', files[0])}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          radius="md"
          mt="lg"
        >
          <Stack align="center" justify="center" style={{ minHeight: 220, pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text ta="center" size="md">
                Cover Photo
              </Text>
              <Text ta="center" size="xs" c="dimmed" mt={7}>
                Drag here or click to select files
              </Text>
            </div>
          </Stack>
        </Dropzone>

        <Group justify="center" mt="lg">
          <Button radius="md" type="submit">
            Post Event
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
