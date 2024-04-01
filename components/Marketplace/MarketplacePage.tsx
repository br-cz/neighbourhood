'use client';

import React, { useState } from 'react';
import { Button, Group, Select, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MarketplaceFeed } from '@/components/Marketplace/MarketplaceFeed';
import { CreateListingDrawer } from '@/components/Marketplace/CreateListingDrawer';

export default function MarketplacePage() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<string | null>('Newly Listed');
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (value: string | null) => {
    setSortQuery(value);
    if (value === 'Saved') {
      toggleRefresh();
    }
  };

  return (
    <>
      <Group justify="space-between" m="20">
        <Title order={1}>Marketplace</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Sort by..."
            defaultValue="Newly Listed"
            onChange={handleSortChange}
            data={['Newly Listed', 'Price: Low to High', 'Price: High to Low', 'Saved']}
            data-testid="sort-marketplace"
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
    </>
  );
}
