'use client';

import React, { useState } from 'react';
import { Group, Avatar, Text, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faSmile, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';
import {
  useCreateFriend,
  useCreateFriendRequest,
  useFetchIncomingFriendRequests,
} from '@/src/api/friendQueries';
import * as APITypes from '@/src/API';

interface UserListItemProps {
  user: User;
  relationshipStatus: string;
  onUpdate: () => void;
}

export function UserListItem({ user, relationshipStatus, onUpdate }: UserListItemProps) {
  const [status, setStatus] = useState(relationshipStatus);
  const { handleCreateFriendRequest, error } = useCreateFriendRequest();
  const { handleCreateFriend, error: createFriendError } = useCreateFriend();
  const { incomingFriendRequests, refetch } = useFetchIncomingFriendRequests();

  const handleAddFriend = async () => {
    try {
      const friendRequestData: APITypes.CreateFriendRequestInput = {
        senderId: '', // This will be set in handleCreateFriendRequest
        receiverId: user.id,
        userFriendRequestsId: user.id, // This is typically the receiverId
      };

      await handleCreateFriendRequest(friendRequestData);
      setStatus('outgoing');
    } catch (err) {
      console.error('Failed to send friend request:', err);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await handleCreateFriend(user.id);
      console.log(onUpdate);
      onUpdate();
      console.log(`Friend request sent to user: ${user.firstName}`);
    } catch (err) {
      console.error('Failed to add friend:', err);
    }
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
            {user?.firstName} {user?.lastName}
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
