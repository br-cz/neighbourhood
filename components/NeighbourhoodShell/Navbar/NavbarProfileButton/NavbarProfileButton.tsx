import { UnstyledButton, Group, Avatar, Text, rem, Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarProfileButton.module.css';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

interface NavbarProfileButtonProps {
  active: boolean;
  setActiveTab: (tab: string) => void;
}

export function NavbarProfileButton({ active, setActiveTab }: NavbarProfileButtonProps) {
  const { currentUser } = useCurrentUser();
  const profilePic = currentUser?.profilePic || './img/placeholder-profile.jpg';

  return (
    <UnstyledButton
      onClick={() => setActiveTab('profile')}
      className={`${classes.user} ${active ? classes.active : ''}`}
      data-testid="profile"
    >
      <Group>
        {currentUser ? (
          <Avatar src={profilePic} size="md" radius="xl" />
        ) : (
          <Skeleton width={36} height={36} radius="xl" />
        )}
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            My Profile
          </Text>

          {currentUser ? (
            <Text c="dimmed" size="xs" data-testid="current-user-info">
              {currentUser?.firstName} {currentUser?.lastName}
            </Text>
          ) : (
            <Skeleton mt={4} width={90} height={4} />
          )}
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
