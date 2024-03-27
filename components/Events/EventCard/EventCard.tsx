import { Card, Image, Text, Button, Group, Center, Avatar, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './EventCard.module.css';
import { Event } from '@/types/types';
import { formatDate, formatTime } from '@/utils/timeUtils';

interface EventCardProps {
  event: Event;
  onView: () => void;
}

export function EventCard({ event, onView }: EventCardProps) {
  const eventImage = event.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = event.organizer?.profilePic || './img/placeholder-profile.jpg';

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
        </Group>
      </Group>
    </Card>
  );
}
