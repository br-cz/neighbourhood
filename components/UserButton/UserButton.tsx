import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './UserButton.module.css';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

interface UserButtonProps {
  active: boolean;
}

export function UserButton({ active }: UserButtonProps) {
  const { currentUser } = useCurrentUser();

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
          <Avatar src={currentUser?.profilePic} size="md" radius="xl">
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
