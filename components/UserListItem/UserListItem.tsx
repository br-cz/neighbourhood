'use client';

import React, { useState, useReducer } from 'react';
import { Group, Avatar, Text, Button, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faSmile, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';
import {
  useCreateFriend,
  useCreateFriendRequest,
  useFetchIncomingFriendRequests,
  useDeleteIncomingFriendRequest,
  useDeleteOutgoingFriendRequest,
  useDeleteFriend,
} from '@/src/hooks/friendsCustomHooks';
import * as APITypes from '@/src/API';
import { User } from '@/types/types';

interface UserListItemProps {
  user: User;
  relationshipStatus: string;
  onUpdate: () => void;
}

export function UserListItem({ user, relationshipStatus, onUpdate }: UserListItemProps) {
  const [status, setStatus] = useState(relationshipStatus);
  const { handleCreateFriendRequest, error } = useCreateFriendRequest();
  const { handleCreateFriend, error: createFriendError } = useCreateFriend();
  const { handleDeleteFriend } = useDeleteFriend();
  const { handleDeleteIncomingFriendRequest } = useDeleteIncomingFriendRequest();
  const { handleDeleteOutgoingFriendRequest } = useDeleteOutgoingFriendRequest();

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
      console.log(`Friend request accepted from: ${user.firstName}`);
      setStatus('friend');
    } catch (err) {
      console.error('Failed to add friend:', err);
    }
  };

  const handleDeclineRequest = async () => {
    modals.openConfirmModal({
      title: <Title order={5}>Decline Friend Request?</Title>,
      children: (
        <Text size="sm">Are you sure you want to decline {user?.firstName}'s friend request?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Decline', cancel: 'Back' },
      onConfirm: async () => {
        try {
          await handleDeleteIncomingFriendRequest(user.id);
          setStatus('none');
        } catch (error) {
          console.error('Failed to decline friend request:', error);
        }
      },
    });
  };

  const handleRemoveFriend = () => {
    modals.openConfirmModal({
      title: <Title order={5}>Remove Friend?</Title>,
      children: (
        <Text size="sm">Are you sure you want to remove {user?.firstName} as a friend?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Remove', cancel: 'Back' },
      onConfirm: async () => {
        try {
          await handleDeleteFriend(user.id);
          setStatus('none');
        } catch (error) {
          console.error('Failed to delete friend:', error);
        }
      },
    });
  };
  const handleCancelRequest = () => {
    console.log(user);
    modals.openConfirmModal({
      title: <Title order={5}>Cancel Friend Request?</Title>,
      children: (
        <Text size="sm">
          Are you sure you cancel your outgoing friend request to {user?.firstName}?
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Cancel', cancel: 'Back' },
      onConfirm: async () => {
        try {
          await handleDeleteOutgoingFriendRequest(user.id);
          setStatus('none');
        } catch (error) {
          console.error('Failed to decline friend request:', error);
        }
      },
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
