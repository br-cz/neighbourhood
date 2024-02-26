import React, { useState } from 'react';
import {
  Drawer,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Text,
  Stack,
  Title,
  Image,
  ActionIcon,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCloudUpload, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { Visibility } from '@/src/API';
import { useCreateEvent } from '@/src/api/eventQueries';
import { combineDateTime } from '@/utils/timeUtils';

interface CreateEventDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreateEventDrawer({ opened, onClose, onPostCreated }: CreateEventDrawerProps) {
  const [loading, handlers] = useDisclosure();
  const { handleCreateEvent } = useCreateEvent();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      location: '',
      date: new Date(),
      time: '',
      visibility: Visibility.PUBLIC,
      images: null as File | null,
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

  const uploadImage = (file: FileWithPath) => {
    // TODO: Upload image to S3 so that we can get a URL to store in the database
  };

  const handleDropImage = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFiles([file]);
      form.setFieldValue('eventImage', file);
    }
  };

  const handleRemoveImage = () => {
    setFiles([]);
    form.setFieldValue('eventImage', null);
  };

  const handleClose = () => {
    form.reset();
    setFiles([]);
    onClose();
  };

  const handleSubmit = async (values: typeof form.values) => {
    handlers.open();
    const eventData = {
      name: values.name,
      description: values.description,
      location: values.location,
      visibility: values.visibility,
      datetime: combineDateTime(values.date, values.time),
      // TODO: Set images to the URL returned from the S3 upload, I think this is how it works
      // images: values.eventImage ? [uploadImage(values.eventImage)] : [],
    };
    console.log(eventData);
    await handleCreateEvent(eventData);
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
      title={
        <Title order={3} component="p">
          New Event
        </Title>
      }
      padding="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          radius="md"
          label="Event Name"
          placeholder="What are you hosting?"
          {...form.getInputProps('name')}
        />

        <Textarea
          radius="md"
          autosize
          minRows={4}
          maxRows={4}
          label={
            <>
              <Group gap={5} align="center">
                <Text fz="sm" fw={500}>
                  Event Description
                </Text>
                <Text fz="sm" c="dimmed">
                  (optional)
                </Text>
              </Group>
            </>
          }
          placeholder="Describe your event..."
          {...form.getInputProps('description')}
          mt="md"
        />

        <TextInput
          radius="md"
          label="Location"
          placeholder="Where should people go?"
          {...form.getInputProps('location')}
          mt="md"
        />

        <Group grow>
          <DatePickerInput
            radius="md"
            label="Date"
            placeholder="Pick a date"
            {...form.getInputProps('date')}
            mt="md"
          />

          <TimeInput
            radius="md"
            label="Time"
            placeholder="Select time"
            {...form.getInputProps('time')}
            mt="md"
          />
        </Group>

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...form.getInputProps('visibility')}
          mt="md"
        />

        <div>
          <Group gap={5} align="center" mt="lg">
            <Text fz="sm" fw={500}>
              Cover Photo
            </Text>
            <Text size="sm" c="dimmed">
              (optional)
            </Text>
            <ActionIcon
              color="red"
              radius="md"
              variant="subtle"
              size={16}
              onClick={handleRemoveImage}
              disabled={previews.length === 0}
              ml={5}
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </ActionIcon>
          </Group>
          {previews.length === 0 ? (
            <Dropzone
              onDrop={handleDropImage}
              onReject={(rejected) => console.log('rejected files', rejected)}
              maxSize={5 * 1024 ** 2}
              maxFiles={1}
              accept={IMAGE_MIME_TYPE}
              radius="md"
              mt={5}
            >
              <Stack
                align="center"
                justify="center"
                style={{ minHeight: 220, pointerEvents: 'none' }}
              >
                <Dropzone.Accept>
                  <FontAwesomeIcon
                    icon={faCloudUpload}
                    size="3x"
                    color="var(--mantine-color-blue-6)"
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <FontAwesomeIcon icon={faXmark} size="3x" color="var(--mantine-color-red-6)" />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <FontAwesomeIcon icon={faImage} size="3x" color="var(--mantine-color-dimmed)" />
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
          <Button radius="md" type="submit" onClick={onClose} loading={loading}>
            Post Event
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
