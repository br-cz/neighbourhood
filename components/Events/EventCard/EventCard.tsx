import { useEffect, useState } from 'react';
import { Card, Image, Text, Button, Group, Avatar, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark } from '@fortawesome/free-solid-svg-icons';
import classes from './EventCard.module.css';
import { Event } from '@/types/types';
import { formatDate, formatTime } from '@/utils/timeUtils';
import { useEventSaves } from '@/src/hooks/eventsCustomHooks';

interface EventCardProps {
  event: Event;
  onView: () => void;
  isSaved: boolean;
}

export function EventCard({ event, onView, isSaved }: EventCardProps) {
  const eventImage = event.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = event.organizer?.profilePic || './img/placeholder-profile.jpg';
  const { saveEvent, unsaveEvent } = useEventSaves(event.id);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(event.saveCount || 0);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

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

      <Text className={classes.title} fw={600} fz="lg" component="a" truncate="end">
        {event?.name}
      </Text>

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
            variant={saved ? 'outline' : 'filled'}
            leftSection={<FontAwesomeIcon icon={faBookmark} />}
            onClick={handleSave}
            data-testid="event-save-button"
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
