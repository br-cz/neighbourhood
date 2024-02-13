// ViewEventModal.tsx
import React from 'react';
import { Modal, Text, Group, Avatar, Image, Stack, Title, Button } from '@mantine/core';
import { IconBookmark, IconMoodSmileBeam } from '@tabler/icons-react';
import classes from './ViewEventModal.module.css';

interface ViewEventModalProps {
  opened: boolean;
  onClose: () => void;
  event: Event;
}

export function ViewEventModal({ opened, onClose, event }: ViewEventModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={2}>{event?.name}</Title>}
      size="md"
      radius="md"
      padding={30}
      transitionProps={{ transition: 'rotate-left' }}
    >
      <Stack gap="sm">
        <Group justify="center" mb={15}>
          <Image src={event?.image} alt={event?.name} className={classes.image} />
        </Group>

        <div>
          <Title order={6}>Description</Title>
          <Text fz="sm">{event?.description}</Text>
        </div>

        <Title order={6}>Organizer</Title>
        <Group gap="xs" align="center">
          <Avatar src={event.organizer.profilePic} alt={event.organizer.name} radius="xl" />
          <Text size="sm" c="dimmed">
            {event.organizer.name}
          </Text>
        </Group>
        <Text size="sm" c="dimmed">
          {event.attendees.length} attending
        </Text>

        <Group gap={25}>
          <div>
            <Title order={6}>Location</Title>
            <Text fz="sm">{event?.location}</Text>
          </div>

          <div>
            <Title order={6}>Date</Title>
            <Text fz="sm">
              {event?.datetime.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </div>

          <div>
            <Title order={6}>Time</Title>
            <Text fz="sm">
              {event?.datetime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </div>

          <Group gap={20} mt={10}>
            <Button
              radius="md"
              size="compact-md"
              leftSection={<IconMoodSmileBeam size={14} />}
              variant="outline"
            >
              RSVP
            </Button>
            <Button
              radius="md"
              size="compact-md"
              leftSection={<IconBookmark size={14} />}
              variant="outline"
            >
              Save
            </Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
}
