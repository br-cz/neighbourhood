import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import classes from './UserButton.module.css';
import { getCurrentUser, useCurrentUser } from '@/src/api/appQueries';

interface UserButtonProps {
  active: boolean;
}

export function UserButton({ active }: UserButtonProps) {
  const { user } = useCurrentUser();
  return (
    <Link href="/profile" passHref className={classes.link}>
      <UnstyledButton className={`${classes.user} ${active ? classes.active : ''}`}>
        <Group>
          <Avatar src={user?.profilePic} size="md" radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={600}>
              My Profile
            </Text>

            <Text c="dimmed" size="xs">
              {user?.firstName} {user?.lastName}
            </Text>
          </div>

          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Link>
  );
}
