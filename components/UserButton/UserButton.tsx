import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './UserButton.module.css';

interface UserButtonProps {
  user: User;
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <Link href="/profile" passHref className={classes.link}>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={user?.profilePic} size="md" radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={600}>
              My Profile
            </Text>

            <Text c="dimmed" size="xs">
              {user?.name}
            </Text>
          </div>

          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Link>
  );
}
