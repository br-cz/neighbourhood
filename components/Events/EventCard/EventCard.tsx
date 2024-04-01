import { useEffect, useState } from 'react';
import { Card, Image, Text, Button, Group, Center, Avatar, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark } from '@fortawesome/free-solid-svg-icons';
import classes from './EventCard.module.css';
import { Event } from '@/types/types';
import { formatDate, formatTime } from '@/utils/timeUtils';
import { retrieveImage as retrieveProfilePic } from '../../utils/s3Helpers/UserProfilePictureS3Helper';
import { retrieveImage as retrieveEventImage } from '../../utils/s3Helpers/EventImageS3Helper';
import { useEventSaves } from '@/src/hooks/eventsCustomHooks';

interface EventCardProps {
  event: Event;
  onView: () => void;
  isSaved: boolean;
}

export function EventCard({ event, onView, isSaved }: EventCardProps) {
  const [profilePic, setProfilePic] = useState<string>('');
  const [eventImage, setEventImage] = useState<string>('');
  const { saveEvent, unsaveEvent } = useEventSaves(event.id);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(event.saveCount || 0);

  useEffect(() => {
    if (!event?.organizer) return;
    retrieveProfilePic(event?.organizer?.id).then((image) => {
      setProfilePic(image);
    });
  }, [event?.organizer?.profilePic]);

  useEffect(() => {
    if (!event) return;
    retrieveEventImage(event.id).then((image) => {
      setEventImage(image);
    });
  }, [event?.images]);

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

      <Text className={classes.title} fw={600} fz="lg" component="a">
        {event?.name}
      </Text>

      <Group>
        <Center>
          <Avatar src={profilePic} size={23} radius="xl" mr="xs" />
          <Text fz="sm" c="dimmed">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </Text>
        </Center>
      </Group>

      <Stack gap="0" className={classes.details}>
        <Text fz="sm">
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
