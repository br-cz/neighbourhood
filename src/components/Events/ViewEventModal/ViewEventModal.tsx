import React from 'react';
import { Modal, Text, Group, Avatar, Image, Stack, Title } from '@mantine/core';
import classes from './ViewEventModal.module.css';
import { Event } from '@/src/API';
import { formatDate, formatTime } from '@/src/utils/timeUtils';

interface ViewEventModalProps {
  opened: boolean;
  onClose: () => void;
  event: Event;
}

export function ViewEventModal({ opened, onClose, event }: ViewEventModalProps) {
  const eventImage = event.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = event.organizer?.profilePic || './img/placeholder-profile.jpg';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} component="p">
          {event?.name}
        </Title>
      }
      size="md"
      radius="md"
      padding={30}
      transitionProps={{ transition: 'rotate-left' }}
      data-testid="view-event-modal"
      closeButtonProps={{ 'aria-label': 'Close Modal' }}
    >
      <Stack gap="sm">
        <Group justify="center" mb={15}>
          <Image
            src={eventImage ?? './img/placeholder-img.jpg'}
            alt={event?.name}
            className={classes.image}
          />
        </Group>

        {event.description && (
          <div>
            <Title order={6}>Description</Title>
            <Text fz="sm">{event?.description}</Text>
          </div>
        )}

        <Title order={6}>Organizer</Title>
        <Group gap="xs" align="center">
          <Avatar src={profilePic} alt={event.organizer.firstName} radius="xl" />
          <Text size="sm" c="dimmed">
            {event.organizer.firstName} {event.organizer.lastName}
          </Text>
        </Group>
        <Group gap={25} mt="xs">
          <div>
            <Title order={6}>Location</Title>
            <Text fz="sm">{event?.location}</Text>
          </div>

          <div>
            <Title order={6}>Date</Title>
            <Text fz="sm">{formatDate(event?.datetime)}</Text>
          </div>

          <div>
            <Title order={6}>Time</Title>
            <Text fz="sm">{formatTime(event?.datetime)}</Text>
          </div>
        </Group>
      </Stack>
    </Modal>
  );
}
