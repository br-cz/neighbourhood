'use client';

import React, { useState } from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { MarketplaceFeed } from '@/components/Marketplace/MarketplaceFeed';
import { CreateListingDrawer } from '@/components/Marketplace/CreateListingDrawer';

export default function MarketplacePage() {
  const [refresh, setRefresh] = useState(false);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const { user } = useAuth();

  if (!user) return null; // or a message indicating the user is not signed in

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Marketplace</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Newly Listed"
            data={['Newly Listed', 'Price: Low to High', 'Price: High to Low']}
          />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<IconSearch />}
            placeholder="Search..."
          />
          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Listing...
          </Button>
        </Group>
      </Group>
      <MarketplaceFeed refresh={refresh} />
      <CreateListingDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />
    </NeighbourhoodShell>
  );
}
