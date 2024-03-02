'use client';

import React, { useState } from 'react';
import { Button, Group, Box, PasswordInput, TextInput, Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { handleProfileUpdate } from './utils/profileUtils';

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
              Could not update details: {errorMessage === "Incorrect username or password." ? "Incorrect password." : errorMessage}
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
