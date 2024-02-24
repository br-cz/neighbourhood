'use client';

import React, { useState } from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { Button, Group, Box, PasswordInput, TextInput, Title, Text } from '@mantine/core';
import { getCurrentUser } from '@/src/api/memberQueries';
import { updateUserEmail } from '@/src/api/userQueries';

import { updatePassword, updateUserAttributes } from 'aws-amplify/auth';
import { notifications } from '@mantine/notifications';

export default function ProfilePage() {
  const { user: loggedIn } = useAuth();
  const [oldPassword, setOldPassword] = useState(''); // For the current password
  const [newPassword, setNewPassword] = useState(''); // For the new password
  const [newEmail, setNewEmail] = useState(''); // If you want to allow changing email
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await getCurrentUser();
      // Update email if it's different from the current email and not empty
      if (newEmail && user!.email !== newEmail) {
        const userAttributes = {
          email: newEmail,
        };

        await updateUserAttributes({ userAttributes: userAttributes });
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
        title: 'Account Details Change Success! ',
        message: `Please don't forget to keep track of these new changes`,
      });
    } catch (error: any) {
      console.error('Error updating user info:', error);
      setErrorMessage(error.message || 'Failed to update profile.');
    }
  };
  
  if (!loggedIn) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Edit User Profile</Title>
      </Group>
      <Group justify="space-between" m="0">
        <Box style={{ minWidth: 300, maxWidth: 500 }} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="New Email"
              value={newEmail}
              radius="md"
              mt="sm"
              onChange={(e) => setNewEmail(e.currentTarget.value)}
            />
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
                {errorMessage}
              </Text>
            )}
            <Button type="submit" mt="lg">
              Submit Changes
            </Button>
          </form>
        </Box>
      </Group>
    </NeighbourhoodShell>
  );
}
