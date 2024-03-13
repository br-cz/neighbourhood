import { useEffect, useState } from 'react';
import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { retrieveImage } from '../utils/s3Helpers/UserProfilePictureS3Helper';

interface UserButtonProps {
  active: boolean;
  setActiveTab: (tab: string) => void;
}

export function UserButton({ active, setActiveTab }: UserButtonProps) {
  const { currentUser } = useCurrentUser();
  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    if (!currentUser) return;
    retrieveImage(currentUser?.id).then((image) => {
      setProfilePic(image);
    });
  }, [currentUser?.profilePic]);

  return (
    <UnstyledButton
      onClick={() => setActiveTab('profile')}
      className={`${classes.user} ${active ? classes.active : ''}`}
      data-testid="profile"
    >
      <Group>
        <Avatar src={profilePic} size="md" radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            My Profile
          </Text>

          <Text c="dimmed" size="xs" data-testid="current-user-info">
            {currentUser?.firstName} {currentUser?.lastName}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
