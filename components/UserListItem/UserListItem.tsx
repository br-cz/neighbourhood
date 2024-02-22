'use client';

import React, { useState } from 'react';
import { Group, Avatar, Text, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faSmile, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';

interface UserListItemProps {
  user: User;
  relationshipStatus: string;
}

export function UserListItem({ user, relationshipStatus }: UserListItemProps) {
  const [status, setStatus] = useState(relationshipStatus);
  const handleAddFriend = () => {
    // Add friend
    setStatus('outgoing');
  };
  const handleAcceptRequest = () => {
    // Accept request
    setStatus('friend');
  };
  const handleDeclineRequest = () => {
    // Decline request
    setStatus('none');
  };
  const handleRemoveFriend = () => {
    // Remove friend
    setStatus('none');
  };
  const handleCancelRequest = () => {
    // Cancel request
    setStatus('none');
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
