import React, { useState } from 'react';
import {
  Drawer,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Text,
  Title,
  Stack,
  ActionIcon,
  Image,
  Box,
  Tooltip,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faImage, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useFormik } from 'formik';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Visibility } from '@/src/types/types';
import { useCreateEvent } from '@/src/hooks/eventsCustomHooks';
import { combineDateTime } from '@/src/utils/timeUtils';
import { createEventSchema } from './createEventValidation';
import { storeImage } from '../../utils/s3Helpers/EventImageS3Helper';

interface CreateEventDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreateEventDrawer({ opened, onClose, onPostCreated }: CreateEventDrawerProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, handlers] = useDisclosure();
  const { handleCreateEvent } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      eventName: '',
      description: '',
      location: '',
      date: new Date(),
      time: '',
      visibility: Visibility.PUBLIC,
    },
    validationSchema: createEventSchema,
    onSubmit: async (parameters) => {
      handlers.open();
      const eventData = {
        name: parameters.eventName,
        description: parameters.description,
        location: parameters.location,
        visibility: parameters.visibility,
        datetime: combineDateTime(parameters.date, parameters.time),
      };

      try {
        const createdEvent = (await handleCreateEvent(eventData)) as {
          id: string;
          _version: number;
        };

        if (files.length > 0 && createdEvent && createdEvent.id) {
          await storeImage(files[0], createdEvent.id);
        }

        onPostCreated();
        notifications.show({
          title: 'Woo-hoo!',
          message: 'Your event has been created and is now visible to your neighbours.',
          color: 'yellow.6',
        });
      } catch (error) {
        console.error('Error creating event:', error);
        notifications.show({
          title: 'Oops!',
          message: 'Something went wrong creating your event - please try again.',
          color: 'red.6',
        });
      } finally {
        handlers.close();
        onClose();
        setFiles([]);
        formik.resetForm();
      }
    },
  });

  const previews = files.map((file: FileWithPath, index: any) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        radius="md"
        mt="xs"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        style={{ maxWidth: 400, maxHeight: 250 }}
      />
    );
  });

  const handleDropImage = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFiles([file]);
    }
  };

  const handleRemoveImage = () => {
    setFiles([]);
    formik.setFieldValue('eventImage', null);
  };

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={() => {
        formik.resetForm();
        setFiles([]);
        onClose();
      }}
      position="right"
      title={
        <Title order={3} component="p" data-testid="New Event">
          New Event
        </Title>
      }
      padding="lg"
      size="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          radius="md"
          label="Event Name"
          placeholder="What are you hosting?"
          {...formik.getFieldProps('eventName')}
          data-testid="create-event-name-input"
          required
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
          {...formik.getFieldProps('description')}
          mt="md"
          data-testid="description"
        />

        <TextInput
          radius="md"
          label="Location"
          placeholder="Where should people go?"
          {...formik.getFieldProps('location')}
          mt="md"
          data-testid="location"
          required
        />

        <Group grow>
          <DatePickerInput
            defaultValue={new Date()}
            radius="md"
            label="Date"
            placeholder="Pick a date"
            mt="md"
            data-testid="date"
            minDate={new Date()}
            onChange={(value) => formik.setFieldValue('date', value)}
          />

          <TimeInput
            radius="md"
            label="Time"
            placeholder="Pick a time"
            {...formik.getFieldProps('time')}
            mt="md"
            data-testid="time"
            required
          />
        </Group>

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
          data-testid="visibility"
          comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
        />

        <Box w={400} h={300}>
          <Group gap={5} align="center" mt="lg">
            <Text fz="sm" fw={500}>
              Cover Photo
            </Text>
            <Text size="sm" c="dimmed">
              (optional)
            </Text>
            <Tooltip label="Remove image" disabled={previews.length === 0}>
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
            </Tooltip>
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
        </Box>

        <Group justify="center" mt="md">
          <Button
            radius="md"
            type="button"
            data-testid="submit-btn"
            onClick={() => {
              formik.validateForm().then((errors) => {
                console.log(errors);
                if (Object.keys(errors).length === 0 && !loading) {
                  formik.submitForm();
                } else {
                  notifications.show({
                    radius: 'md',
                    color: 'red',
                    title: 'Oops!',
                    message: "Couldn't create your event - please check your inputs and try again.",
                  });
                }
              });
            }}
            loading={loading}
          >
            Post Event
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
