'use client';

import React, { useState } from 'react';
import { Button, Group, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';
import { AccountSettingsModal } from '@/components/ProfileCard/AccountSettingsModal';
import { CustomizeProfileModal } from '@/components/ProfileCard/CustomizeProfileModal';

export default function ProfilePage() {
  const [accountSettingsModalOpened, setAccountSettingsModalOpened] = useState(false);
  const [customizeProfileModalOpened, setCustomizeProfileModalOpened] = useState(false);
  const { user: loggedIn } = useAuth();
  if (!loggedIn) return null;

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m={20}>
        <Title order={1}>My Public Profile</Title>
        <Group gap="sm">
          <Button
            radius="md"
            size="sm"
            leftSection={<FontAwesomeIcon icon={faPen} />}
            onClick={() => {
              setCustomizeProfileModalOpened(true);
            }}
            data-testid="edit-card-btn"
          >
            Customize
          </Button>
          <Button
            radius="md"
            size="sm"
            variant="default"
            leftSection={<FontAwesomeIcon icon={faGear} />}
            onClick={() => {
              setAccountSettingsModalOpened(true);
            }}
            data-testid="open-settings-btn"
          >
            Settings
          </Button>
        </Group>
      </Group>
      <ProfileCard />
      <AccountSettingsModal
        opened={accountSettingsModalOpened}
        onClose={() => setAccountSettingsModalOpened(false)}
      />
      <CustomizeProfileModal
        opened={customizeProfileModalOpened}
        onClose={() => setCustomizeProfileModalOpened(false)}
      />
    </NeighbourhoodShell>
  );
}
