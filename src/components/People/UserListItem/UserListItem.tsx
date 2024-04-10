'use client';

import React, { useState } from 'react';
import { Group, Avatar, Text, Button, Title, Popover } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faSmile, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './UserListItem.module.css';

import {
  useCreateFriend,
  useCreateFriendRequest,
  useDeleteIncomingFriendRequest,
  useDeleteOutgoingFriendRequest,
  useDeleteFriend,
} from '@/src/hooks/friendsCustomHooks';
import * as APITypes from '@/src/API';
import { User } from '@/src/types/types';
import { UserListItemPreview } from './UserListItemPreview';

interface UserListItemProps {
  user: User;
  relationshipStatus: string;
  onChange: (newStatus: string) => void;
}

export function UserListItem({ user, relationshipStatus, onChange }: UserListItemProps) {
  const [active, setActive] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const profilePic = user?.profilePic || './img/placeholder-profile.jpg';
  const { handleCreateFriendRequest } = useCreateFriendRequest();
  const { handleCreateFriend } = useCreateFriend();
  const { handleDeleteFriend } = useDeleteFriend();
  const { handleDeleteIncomingFriendRequest } = useDeleteIncomingFriendRequest();
  const { handleDeleteOutgoingFriendRequest } = useDeleteOutgoingFriendRequest();

  const handleButtonClicked = () => {
    if (!popoverOpened) {
      setActive((a: boolean) => !a);
      setPopoverOpened((o: boolean) => !o);
    }
  };

  const handlePreviewClicked = () => {
    setActive((a: boolean) => !a);
    setPopoverOpened((o: boolean) => !o);
  };

  const handleAddFriend = async () => {
    try {
      const friendRequestData: APITypes.CreateFriendRequestInput = {
        senderId: '',
        receiverId: user.id,
        userFriendRequestsId: user.id,
      };
      onChange('outgoing');
      await handleCreateFriendRequest(friendRequestData);
    } catch (err) {
      console.error('Failed to send friend request:', err);
      notifications.show({
        radius: 'md',
        color: 'red',
        title: 'Oops!',
        message: 'Failed to add friend, please try again.',
      });
    }
  };

  const handleAcceptRequest = async () => {
    try {
      onChange('friend');
      await handleCreateFriend(user.id);
      console.log(`Friend request accepted from: ${user.firstName}`);
    } catch (err) {
      console.error('Failed to add friend:', err);
      notifications.show({
        radius: 'md',
        color: 'red',
        title: 'Oops!',
        message: 'Failed to accept friend request, please try again.',
      });
    }
  };

  const handleDeclineRequest = async () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Decline Friend Request?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to decline {user?.firstName}&apos;s friend request?
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Decline', cancel: 'Back' },
      onConfirm: async () => {
        try {
          onChange('decline');
          await handleDeleteIncomingFriendRequest(user.id);
        } catch (error) {
          console.error('Failed to decline friend request:', error);
          notifications.show({
            radius: 'md',
            color: 'red',
            title: 'Oops!',
            message: 'Failed to decline friend request, please try again.',
          });
        }
      },
    });
  };

  const handleRemoveFriend = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Remove Friend?
        </Title>
      ),
      children: (
        <Text size="sm">Are you sure you want to remove {user?.firstName} as a friend?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Remove', cancel: 'Back' },
      onConfirm: async () => {
        try {
          onChange('remove');
          await handleDeleteFriend(user.id);
        } catch (error) {
          console.error('Failed to delete friend:', error);
          notifications.show({
            radius: 'md',
            color: 'red',
            title: 'Oops!',
            message: 'Failed to remove friend, please try again.',
          });
        }
      },
    });
  };
  const handleCancelRequest = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Cancel Friend Request?
        </Title>
      ),
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
          onChange('cancel');
          await handleDeleteOutgoingFriendRequest(user.id);
        } catch (error) {
          console.error('Failed to decline friend request:', error);
          notifications.show({
            radius: 'md',
            color: 'red',
            title: 'Oops!',
            message: 'Failed to cancel friend request, please try again.',
          });
        }
      },
    });
  };

  // Decide the button based on the relationship status
  let button;
  switch (relationshipStatus) {
    case 'friend':
      button = (
        <Button
          radius="md"
          size="xs"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faSmile} />}
          onClick={() => {
            handleRemoveFriend();
            handleButtonClicked();
          }}
          data-testid="friends-btn"
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
          onClick={() => {
            handleCancelRequest();
            handleButtonClicked();
          }}
          data-testid="outgoing-request-btn"
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
            onClick={() => {
              handleAcceptRequest();
              handleButtonClicked();
            }}
            data-testid="accept-request-btn"
          >
            Accept
          </Button>
          <Button
            radius="md"
            size="xs"
            color="red"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            data-testid="decline-request-btn"
            onClick={() => {
              handleDeclineRequest();
              handleButtonClicked();
            }}
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
          onClick={() => {
            handleAddFriend();
            handleButtonClicked();
          }}
          data-testid="add-friend-btn"
        >
          Add Friend
        </Button>
      );
      break;
  }

  return (
    <Popover
      opened={popoverOpened}
      onChange={handlePreviewClicked}
      classNames={{ dropdown: classes.preview }}
    >
      <Popover.Target>
        <div
          className={`${classes.user} ${active ? classes.active : ''}`}
          data-testid="user-item"
          onClick={handlePreviewClicked}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <Group>
            <Avatar src={profilePic} size="lg" radius="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={600}>
                {user?.firstName} {user?.lastName}
              </Text>

              <Text c="dimmed" size="xs">
                {user?.username}
              </Text>
            </div>
            {button}
            <Popover.Dropdown>
              <UserListItemPreview user={user} relationshipStatus={relationshipStatus} />
            </Popover.Dropdown>
          </Group>
        </div>
      </Popover.Target>
    </Popover>
  );
}
