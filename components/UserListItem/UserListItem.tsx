'use client';

import React, { useState } from 'react';
import { Group, Avatar, Text, Button, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faSmile, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';

interface UserListItemProps {
  user: User;
  relationshipStatus: string;
}

export function UserListItem({ user, relationshipStatus }: UserListItemProps) {
  const [status, setStatus] = useState(relationshipStatus);

  const handleAddFriend = () => setStatus('outgoing');

  const handleAcceptRequest = () => {
    setStatus('friend');
  };

  const handleDeclineRequest = () => {
    modals.openConfirmModal({
      title: <Title order={5}>Decline Friend Request?</Title>,
      children: (
        <Text size="sm">Are you sure you want to decline {user?.name}'s friend request?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Decline', cancel: 'Back' },
      onConfirm: () => setStatus('none'),
    });
  };

  const handleRemoveFriend = () => {
    modals.openConfirmModal({
      title: <Title order={5}>Remove Friend?</Title>,
      children: <Text size="sm">Are you sure you want to remove {user?.name} as a friend?</Text>,
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Remove', cancel: 'Back' },
      onConfirm: () => setStatus('none'),
    });
  };
  const handleCancelRequest = () => {
    modals.openConfirmModal({
      title: <Title order={5}>Cancel Friend Request?</Title>,
      children: (
        <Text size="sm">Are you sure you cancel your outgoing friend request to {user?.name}?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Cancel', cancel: 'Back' },
      onConfirm: () => setStatus('none'),
    });
  };

  // Decide the button based on the relationship status
  let button;
  switch (status) {
    case 'friend':
      button = (
        <Button
          radius="md"
          size="xs"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faSmile} />}
          onClick={handleRemoveFriend}
        >
          Friends
        </Button>
      );
      break;
    case 'outgoing':
      button = (
        <Button
          radius="md"
          size="xs"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faClock} />}
          onClick={handleCancelRequest}
        >
          Pending
        </Button>
      );
      break;
    case 'incoming':
      button = (
        <>
          <Button
            radius="md"
            size="xs"
            leftSection={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleAcceptRequest}
          >
            Accept
          </Button>
          <Button
            radius="md"
            size="xs"
            color="red"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={handleDeclineRequest}
          >
            Decline
          </Button>
        </>
      );
      break;
    case 'none':
    default:
      button = (
        <Button
          radius="md"
          size="xs"
          leftSection={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={handleAddFriend}
        >
          Add Friend
        </Button>
      );
      break;
  }

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
        {button}
      </Group>
    </div>
  );
}
