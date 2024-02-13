import { IconBookmark, IconMoodSmileBeam, IconList } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  Button,
  ActionIcon,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
  Stack,
} from '@mantine/core';
import classes from './EventCard.module.css';

interface EventCardProps {
  event: Event;
  onView: () => void;
}

export function EventCard({ event, onView }: EventCardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <a>
        <Image src={event?.image} height={180} className={classes.image} />
      </a>

      <Text className={classes.title} fw={600} fz="lg" component="a">
        {event?.name}
      </Text>

      <Group>
        <Center>
          <Avatar src={event?.organizer?.profilePic} size={23} radius="xl" mr="xs" />
          <Text fz="sm" c="dimmed">
            {event?.organizer?.name}
          </Text>
        </Center>
      </Group>

      <Stack gap="0" className={classes.details}>
        <Text fz="sm">
          <b>Location:</b> {event?.location}
        </Text>
        <Text fz="sm">
          <b>Date:</b>{' '}
          {event?.datetime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text fz="sm">
          <b>Time:</b>{' '}
          {event?.datetime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>
      </Stack>

      <Group justify="space-between" className={classes.footer}>
        <Text fz="xs" c="dimmed">
          {event?.attendees.length} attending
        </Text>

        <Group gap={8} mr={0}>
          <Button
            radius="md"
            size="compact-sm"
            leftSection={<IconList size={14} />}
            variant="filled"
            onClick={onView}
          >
            View
          </Button>
          <Button
            radius="md"
            size="compact-sm"
            leftSection={<IconMoodSmileBeam size={14} />}
            variant="outline"
          >
            RSVP
          </Button>
          <ActionIcon variant="outline" radius="md">
            <IconBookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.dark[7]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
