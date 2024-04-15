import { useEffect, useState } from 'react';
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Avatar,
  Stack,
  Title,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '@/src/utils/timeUtils';
import { useDeleteEvent, useEventSaves } from '@/src/hooks/eventsCustomHooks';
import { Event } from '@/src/types/types';
import classes from './EventCard.module.css';

interface EventCardProps {
  event: Event;
  isSaved?: boolean;
  isOrganizer?: boolean;
  onView: () => void;
  onUpdate?: () => void;
}

export function EventCard({ event, isSaved, isOrganizer, onView, onUpdate }: EventCardProps) {
  const eventImage = event.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = event.organizer?.profilePic || './img/placeholder-profile.jpg'; //
  const { handleDeleteEvent } = useDeleteEvent();
  const { saveEvent, unsaveEvent } = useEventSaves(event.id);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(event.saveCount || 0);

  useEffect(() => {
    setSaved(isSaved!);
  }, [isSaved]);

  const handleDelete = () => {
    handleDeleteEvent(event);
    onUpdate?.();
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Delete event?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to delete your event? This action cannot be undone.
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red.6' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Delete', cancel: 'Back' },
      onConfirm: () => handleDelete(),
    });
  };

  const handleSave = async () => {
    if (saved) {
      setSaveCount(saveCount! - 1);
      setSaved(false);
      await unsaveEvent();
    } else {
      setSaveCount(saveCount! + 1);
      setSaved(true);
      await saveEvent();
    }
  };

  return (
    <Card withBorder radius="md" className={classes.card} data-testid="event-card">
      <a>
        <Image
          src={eventImage ?? './img/placeholder-img.jpg'}
          height={180}
          className={classes.image}
        />
      </a>

      <Group justify="flex-start" gap="0px" align="center" wrap="nowrap">
        <Text fw={600} fz="lg" component="a" className={classes.title} truncate="end">
          {event?.name}
        </Text>
        {isOrganizer && (
          <Tooltip label="Delete event">
            <ActionIcon
              color="red.7"
              radius="xl"
              variant="subtle"
              size="sm"
              className={classes.title}
              onClick={openDeleteModal}
              data-testid="delete-event-btn"
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

      <Group justify="flex-start" gap="0px" align="center" wrap="nowrap">
        <Avatar src={profilePic} size={23} radius="xl" mr="xs" />
        <Text fz="sm" c="dimmed" truncate="end">
          {event?.organizer?.firstName} {event?.organizer?.lastName}
        </Text>
      </Group>

      <Stack gap="0" className={classes.details}>
        <Text fz="sm" truncate="end">
          <b>Location:</b> {event?.location}
        </Text>
        <Text fz="sm">
          <b>Date:</b> {formatDate(event?.datetime)}
        </Text>
        <Text fz="sm">
          <b>Time:</b> {formatTime(event?.datetime)}
        </Text>
      </Stack>

      <Group justify="space-between" className={classes.footer}>
        <Group gap={8} mr={0}>
          <Button
            radius="md"
            size="compact-sm"
            leftSection={<FontAwesomeIcon icon={faBars} />}
            variant="filled"
            onClick={onView}
          >
            View
          </Button>
          <Button
            radius="md"
            size="compact-sm"
            variant={saved || isSaved ? 'outline' : 'filled'}
            leftSection={<FontAwesomeIcon icon={faBookmark} />}
            onClick={handleSave}
            data-testid="event-save-button"
          >
            {saved || isSaved ? 'Saved' : 'Save'}
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
