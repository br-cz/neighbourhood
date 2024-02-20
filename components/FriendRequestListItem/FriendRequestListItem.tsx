'use client';

import { Group, Avatar, Text, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './FriendRequestListItem.module.css';

interface FriendRequestListItemProps {
  user: User;
}

export function FriendRequestListItem({ user }: FriendRequestListItemProps) {
  return (
    <div className={classes.user}>
      <Group>
        <Avatar src={user?.profilePic} size="lg" radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            {user?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.username}
          </Text>
        </div>

        <Button radius="md" size="xs" leftSection={<FontAwesomeIcon icon={faCheck} />}>
          Accept
        </Button>
        <Button radius="md" size="xs" color="red" leftSection={<FontAwesomeIcon icon={faXmark} />}>
          Decline
        </Button>
      </Group>
    </div>
  );
}
