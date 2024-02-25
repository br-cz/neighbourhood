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

export default function ProfilePage() {
  const { user: loggedIn } = useAuth();
  const [loading, handlers] = useDisclosure();
  const [oldPassword, setOldPassword] = useState(''); // For the current password
  const [newPassword, setNewPassword] = useState(''); // For the new password
  const [newEmail, setNewEmail] = useState(''); // If you want to allow changing email
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const user = await getCurrentUser();
      console.log('User info update:', oldPassword, newPassword, newEmail);
      // Update email if it's different from the current email and not empty
      if (newEmail && user!.email !== newEmail) {
        const userAttributes = {
          email: newEmail,
        };

        await updateUserAttributes({ userAttributes });
        await updateUserEmail(user!.id, newEmail, user!._version);
      }

      // Update password if oldPassword, newPassword are provided and not empty
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
  };


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
        handleSubmit();
      },
    });
  };

  if (!loggedIn) return null; // or a message indicating the user is not signed in

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
