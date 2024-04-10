import { useState } from 'react';
import { Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { ItemForSale } from '@/src/types/types';
import { MarketplaceCard } from '@/src/components/Marketplace/MarketplaceCard/MarketplaceCard';
import { ViewListingModal } from '@/src/components/Marketplace/ViewListingModal/ViewListingModal';
import { useFetchListings, useUserListingSaves } from '@/src/hooks/marketplaceCustomHooks';
import { filterAndSortListings } from '@/src/utils/marketplaceUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export function MarketplaceFeed({
  refresh,
  searchQuery,
  sortQuery,
  onUpdate,
}: {
  refresh: boolean;
  searchQuery: string;
  sortQuery: string | null;
  onUpdate?: () => void;
}) {
  const { listings, loading } = useFetchListings(refresh);
  const { saves } = useUserListingSaves(refresh);
  const { currentUser } = useCurrentUser();
  const [viewListingModalOpened, setViewListingModalOpened] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const filteredAndSortedListings = filterAndSortListings(listings, searchQuery, sortQuery, saves);

  const handleViewListing = (item: any) => {
    setSelectedListing(item);
    setViewListingModalOpened(true);
  };

  return (
    <>
      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : listings.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="xl" c="dimmed">
            No item is up for grabs yet, try listing yours!
          </Text>
        </Group>
      ) : filteredAndSortedListings.length === 0 ? (
        <Group justify="center" mt="200">
          <Text size="xl" c="dimmed">
            There is no item that matches your search query
          </Text>
        </Group>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={{ base: 5, sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          data-testid="marketplace-feed"
        >
          {filteredAndSortedListings.map((item: ItemForSale) => (
            <MarketplaceCard
              key={item.id}
              item={item}
              isSaved={saves ? saves.get(item.id) : false}
              isSeller={item.seller?.id === currentUser?.id}
              onView={() => handleViewListing(item)}
              onUpdate={onUpdate}
            />
          ))}
        </SimpleGrid>
      )}
      {selectedListing && (
        <ViewListingModal
          opened={viewListingModalOpened}
          onClose={() => setViewListingModalOpened(false)}
          item={selectedListing}
        />
      )}
    </>
  );
}
