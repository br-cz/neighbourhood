import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './CommunityButton.module.css';

interface CommunityButtonProps {
  user: User;
}

export function CommunityButton({ user }: CommunityButtonProps) {
  return (
    <Link href="/communities" passHref className={classes.link}>
      <UnstyledButton className={classes.community}>
        <Group>
          <Avatar src={user?.selectedCommunity?.image} size="md" radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={600}>
              My Community
            </Text>

            <Text c="dimmed" size="xs">
              {user?.selectedCommunity?.name}
            </Text>
          </div>

          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Link>
  );
}
