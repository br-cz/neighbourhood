'use client';

import React, { useState } from 'react';
import { Group, Avatar, Text, Button, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
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

  //user = user[0];

  // if (relationshipStatus === 'friend') {
  //   console.log('user');
  //   console.log(user);
  //   console.log(user.username);
  // }

  // if (relationshipStatus === 'none') {
  //   console.log('user');
  //   console.log(user);
  //   // console.log(user.username);
  // }

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
