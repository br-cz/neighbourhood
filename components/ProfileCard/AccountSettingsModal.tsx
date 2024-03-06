import React, { useState } from 'react';
import { Modal, Text, Stack, Title, Box, TextInput, PasswordInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { handleProfileUpdate } from '@/app/profile/utils/profileUtils';

interface AccountSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({ opened, onClose }: AccountSettingsModalProps) {
  const [loading, handlers] = useDisclosure();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
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
        handleSubmit();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} component="p">
          Account Settings
        </Title>
      }
      size="sm"
      radius="md"
      padding={30}
      transitionProps={{ transition: 'pop' }}
      data-testid="account-settings-modal"
      closeButtonProps={{ 'aria-label': 'Close Modal' }}
    >
      <Stack gap="sm">
        <form>
          <Box>
            <Title order={5}>Edit Email</Title>
            <TextInput
              label="New Email"
              value={newEmail}
              radius="md"
              mt="sm"
              data-testid="new-email-input"
              onChange={(e) => setNewEmail(e.currentTarget.value)}
            />
            <Title order={5} mt="xl">
              Edit Password
            </Title>
            <PasswordInput
              label="Old Password"
              value={oldPassword}
              radius="md"
              data-testid="old-password-input"
              onChange={(e) => setOldPassword(e.currentTarget.value)}
              mt="md"
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              radius="md"
              data-testid="new-password-input"
              onChange={(e) => setNewPassword(e.currentTarget.value)}
              mt="md"
            />
            {errorMessage && (
              <Text c="red" m="xs" size="sm">
                Couldn&apos;t update details: {errorMessage}
              </Text>
            )}
            <Button onClick={confirmSubmit} mt="xl" data-testid="submit-btn" loading={loading}>
              Submit Changes
            </Button>
          </Box>
        </form>
      </Stack>
    </Modal>
  );
}
