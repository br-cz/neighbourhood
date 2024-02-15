'use client';

import { Group, Avatar, Text, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';

interface UserListItemProps {
  user: User;
}

export function UserListItem({ user }: UserListItemProps) {
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

        <Button radius="md" size="xs" leftSection={<FontAwesomeIcon icon={faUserPlus} />}>
          Add Friend
        </Button>
      </Group>
    </div>
  );
}
