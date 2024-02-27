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
  rem,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCloudUpload, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { Visibility } from '@/src/API';
import { useCreateEvent } from '@/src/api/eventQueries';
import { combineDateTime } from '@/utils/timeUtils';
import { useFormik } from 'formik';
import { createEventSchema } from './createEventValidation';
import { notifications } from '@mantine/notifications';

interface CreateEventDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreateEventDrawer({ opened, onClose, onPostCreated }: CreateEventDrawerProps) {
  const [loading, handlers] = useDisclosure();
  const { handleCreateEvent } = useCreateEvent();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      location: '',
      date: new Date(),
      time: '',
      visibility: Visibility.PUBLIC,
      images: null as File | null,
    },
    validationSchema: createEventSchema,
    onSubmit: async (parameters) => {
      handlers.open();
      const eventData = {
        name: parameters.name,
        description: parameters.description,
        location: parameters.location,
        visibility: parameters.visibility,
        datetime: combineDateTime(parameters.date, parameters.time),
        // TODO: Set images to the URL returned from the S3 upload, I think this is how it works
        //images: parameters.images ? [uploadImage(parameters.images)] : [],
      };

      await handleCreateEvent(eventData);
      onPostCreated();
      handlers.close();
      onClose();
      formik.resetForm();
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
      formik.setFieldValue('eventImage', file);
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
        onClose();
      }}
      position="right"
      title={
        <Title order={3} component="p">
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
          {...formik.getFieldProps('name')}
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
        />

        <TextInput
          radius="md"
          label="Location"
          placeholder="Where should people go?"
          {...formik.getFieldProps('location')}
          mt="md"
          required
        />

        <Group grow>
          <DatePickerInput
            radius="md"
            label="Date"
            placeholder="Pick a date"
            {...formik.getFieldProps('date')}
            mt="md"
          />

          <TimeInput
            radius="md"
            label="Time"
            placeholder="Pick a time"
            {...formik.getFieldProps('time')}
            mt="md"
            required
          />
        </Group>

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...formik.getFieldProps('visibility')}
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
          <Button
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
                    message:
                      "Couldn't create your event - please fill out all the required fields.",
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
