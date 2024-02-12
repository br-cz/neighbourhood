import React from 'react';
import { AppShell, Group, Burger, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';

interface NeighbourhoodShellProps {
  children: React.ReactNode;
}

export const NeighbourhoodShell: React.FC<NeighbourhoodShellProps> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();

  const logo = colorScheme === 'dark' ? '/logo-outline.svg' : '/logo.svg';

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group px="md" style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
          <Group align="center">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Image src={logo} alt="Neighbourhood Logo" width={200} height={37} priority />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
