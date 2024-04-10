'use client';

import React, { useState } from 'react';
import { Button, Group, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { ProfileCard } from '@/src/components/Profile/ProfileCard/ProfileCard';
import { AccountSettingsModal } from '@/src/components/Profile/ProfileCard/AccountSettingsModal';
import { CustomizeProfileModal } from '@/src/components/Profile/ProfileCard/CustomizeProfileModal';

export default function ProfilePage() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const [accountSettingsModalOpened, setAccountSettingsModalOpened] = useState(false);
  const [customizeProfileModalOpened, setCustomizeProfileModalOpened] = useState(false);

  return (
    <>
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
            data-testid="customize-profile-btn"
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
      <ProfileCard refresh={refresh} />
      <AccountSettingsModal
        opened={accountSettingsModalOpened}
        onClose={() => setAccountSettingsModalOpened(false)}
      />
      <CustomizeProfileModal
        opened={customizeProfileModalOpened}
        onClose={() => setCustomizeProfileModalOpened(false)}
        onUpdate={toggleRefresh}
      />
    </>
  );
}
