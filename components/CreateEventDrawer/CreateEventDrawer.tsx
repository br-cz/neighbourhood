import React from 'react';
import { Drawer, TextInput, Textarea, Button, Group, Select, Text, Title } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Visibility } from '@/src/API';
import { useCreateEvent } from '@/src/hooks/eventsCustomHooks';
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

      await handleCreateEvent(eventData);
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
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...formik.getFieldProps('visibility')}
          mt="md"
          data-testid="visibility"
        />

        <Group justify="center" mt="lg">
          <Button
            radius="md"
            type="button"
            data-testid="submit button"
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
