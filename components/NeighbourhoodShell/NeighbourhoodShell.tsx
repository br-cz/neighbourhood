import React from 'react';
import { signOut } from '@aws-amplify/auth';
import { AppShell, Group, Burger, Button, Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';

interface NeighbourhoodShellProps {
  children: React.ReactNode;
}

export const NeighbourhoodShell: React.FC<NeighbourhoodShellProps> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut({ global: true });
      localStorage.removeItem('currentUser');
      router.push('/');
      notifications.show({
        radius: 'md',
        title: 'Logged out!',
        message: 'Log back in to continue using Neighborhood.',
      });
      console.log('Signed out!');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const openSignOutModal = () => {
    modals.openConfirmModal({
      title: <Title order={5}>Sign out?</Title>,
      children: <Text size="sm">Are you sure you want to sign out of Neighbourhood?</Text>,
      confirmProps: { size: 'xs', radius: 'md' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Confirm', cancel: 'Back' },
      onConfirm: () => handleSignOut(),
    });
  };

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 270,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      data-testid="shell"
    >
      <AppShell.Header>
        <Group px="md" style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
          <Group align="center" justify="space-between">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Image
              src="./logo.svg"
              alt="Neighbourhood Logo"
              width={200}
              height={37}
              priority
              data-testid="logo"
            />
          </Group>
          <Button
            onClick={openSignOutModal}
            radius="md"
            variant="default"
            color="red"
            data-testid="logout"
          >
            Sign Out
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main m="xl" mt="xs">
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
