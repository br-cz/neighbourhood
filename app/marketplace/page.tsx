'use client';

import React, { useState } from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { MarketplaceFeed } from '@/components/Marketplace/MarketplaceFeed';
import { CreateListingDrawer } from '@/components/Marketplace/CreateListingDrawer';

export default function MarketplacePage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<string | null>('Newly Listed');
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const { user } = useAuth();
  if (!user) return null;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Marketplace</Title>
        <Group>
          <Select
            radius="md"
            defaultValue="Newly Listed"
            onChange={setSortQuery}
            data={['Newly Listed', 'Price: Low to High', 'Price: High to Low']}
          />
          <TextInput
            radius="md"
            value={searchQuery}
            onChange={handleSearchChange}
            rightSectionPointerEvents="none"
            rightSection={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Search..."
          />

          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Listing...
          </Button>
        </Group>
      </Group>
      <MarketplaceFeed refresh={refresh} searchQuery={searchQuery} sortQuery={sortQuery} />
      <CreateListingDrawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        onPostCreated={toggleRefresh}
      />
    </NeighbourhoodShell>
  );
}
