'use client';

import React, { useState } from 'react';
import { Button, Group, Box, PasswordInput, TextInput, Title, Text } from '@mantine/core';
import { updatePassword, updateUserAttributes } from 'aws-amplify/auth';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { updateUserEmail } from '@/src/api/userQueries';
import { getCurrentUser } from '@/src/api/appQueries';

export async function handleProfileUpdate(
  oldPassword: string,
  newPassword: string,
  newEmail: string,
  setErrorMessage: any,
  setNewEmail: any,
  setOldPassword: any,
  setNewPassword: any,
  handlers: any
) {
  try {
    const user = await getCurrentUser();
    console.log('User info update:', oldPassword, newPassword, newEmail);
    if (newEmail && user!.email !== newEmail) {
      const userAttributes = { email: newEmail };
      await updateUserAttributes({ userAttributes });
      await updateUserEmail(user!.id, newEmail, user!._version);
    }

    if (oldPassword && newPassword && oldPassword !== newPassword) {
      await updatePassword({ oldPassword, newPassword });
    }

    setErrorMessage('');
    setNewEmail('');
    setOldPassword('');
    setNewPassword('');
    notifications.show({
      radius: 'md',
      title: 'Your login details have been updated!',
      message: "Please don't forget to keep track of these new changes",
    });
  } catch (error: any) {
    console.error('Error updating user info:', error);
    setErrorMessage(error.message || 'Failed to update profile.');
  } finally {
    handlers.close();
  }
}

export default function ProfilePage() {
  const { user: loggedIn } = useAuth();
  const [loading, handlers] = useDisclosure();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const confirmSubmit = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Save changes?
        </Title>
      ),
      children: <Text size="sm">Are you wish to update your login details?</Text>,
      confirmProps: { size: 'xs', radius: 'md' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Confirm', cancel: 'Back' },
      onConfirm: () => {
        handlers.open();
        handleProfileUpdate(
          oldPassword,
          newPassword,
          newEmail,
          setErrorMessage,
          setNewEmail,
          setOldPassword,
          setNewPassword,
          handlers
        );
      },
    });
  };

  if (!loggedIn) return null;

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m={20}>
        <Title order={1}>Edit Login Details</Title>
      </Group>
      <form>
        <Box w={300} m={20}>
          <Title order={5} mt={25}>
            Change Email
          </Title>
          <TextInput
            label="New Email"
            value={newEmail}
            radius="md"
            mt="sm"
            onChange={(e) => setNewEmail(e.currentTarget.value)}
          />
          <Title order={5} mt={25}>
            Change Password
          </Title>
          <PasswordInput
            label="Old Password"
            value={oldPassword}
            radius="md"
            onChange={(e) => setOldPassword(e.currentTarget.value)}
            mt="md"
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            radius="md"
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            mt="md"
          />
          {errorMessage && (
            <Text c="red" m="xs" size="sm">
              Couldn&apos;t update details: {errorMessage}
            </Text>
          )}
          <Button onClick={confirmSubmit} mt={30} loading={loading}>
            Submit Changes
          </Button>
        </Box>
      </form>
    </NeighbourhoodShell>
  );
}
