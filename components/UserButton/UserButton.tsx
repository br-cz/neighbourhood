import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './UserButton.module.css';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { retrieveImage } from '../utils/s3Helpers/UserProfilePictureS3Helper';

interface UserButtonProps {
  active: boolean;
}

export function UserButton({ active }: UserButtonProps) {
  const { currentUser } = useCurrentUser();
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>(undefined);

  async function getPicture(userId: string) {
    try {
      const imageUrl = await retrieveImage(userId);
      return imageUrl;
    } catch (error: any) {
      return '';
    }
  }

  useEffect(() => {
    if (currentUser?.id) {
      getPicture(currentUser.id).then(setProfilePicUrl);
    }
  }, [currentUser]);

  function getInitials() {
    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const firstInitial = firstName && firstName[0] ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName && lastName[0] ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  return (
    <Link href="/profile" passHref className={classes.link} data-testid="profile">
      <UnstyledButton className={`${classes.user} ${active ? classes.active : ''}`}>
        <Group>
          <Avatar src={profilePicUrl} size="md" radius="xl">
            {getInitials()}
          </Avatar>
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
    </Link>
  );
}
