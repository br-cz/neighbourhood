import React, { useState } from 'react';
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
  Image,
  ActionIcon,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrashFilled } from '@tabler/icons-react';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

interface CreateEventDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateEventDrawer({ opened, onClose }: CreateEventDrawerProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const form = useForm({
    initialValues: {
      eventName: '',
      eventDescription: '',
      location: '',
      date: new Date(),
      time: '',
      visibility: 'public',
      eventImage: null as File | null,
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        radius="md"
        mt="xs"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFiles([file]);
      form.setFieldValue('eventImage', file);
    }
  };

  const handleRemove = () => {
    setFiles([]);
    form.setFieldValue('eventImage', null);
  };

  const handleClose = () => {
    form.reset();
    setFiles([]);
    onClose();
  };

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={handleClose}
      position="right"
      title={<Title order={3}>New Event</Title>}
      padding="lg"
      size="md"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          handleClose();
        })}
      >
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

        <Group grow>
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
        </Group>

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

        <div>
          <Group gap="sm" align="center" mt="lg">
            <Text fz="sm" fw={500}>
              Cover Photo
            </Text>
            <ActionIcon
              color="red"
              radius="md"
              variant="subtle"
              size="xs"
              onClick={handleRemove}
              disabled={previews.length === 0}
            >
              <IconTrashFilled size={16} />
            </ActionIcon>
          </Group>
          {previews.length === 0 ? (
            <Dropzone
              onDrop={handleDrop}
              onReject={(rejected) => console.log('rejected files', rejected)}
              maxSize={5 * 1024 ** 2}
              maxFiles={1}
              accept={IMAGE_MIME_TYPE}
              radius="md"
              mt="xs"
            >
              <Stack
                align="center"
                justify="center"
                style={{ minHeight: 220, pointerEvents: 'none' }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-blue-6)',
                    }}
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
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text ta="center" size="md">
                    Drag here or click to select file
                  </Text>
                  <Text ta="center" size="xs" c="dimmed" mt={7}>
                    File should not exceed 5MB
                  </Text>
                </div>
              </Stack>
            </Dropzone>
          ) : (
            <>{previews}</>
          )}
        </div>

        <Group justify="center" mt="lg">
          <Button radius="md" type="submit" onClick={onClose}>
            Post Event
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
