import { useState } from 'react';
import { Group, Loader, SimpleGrid } from '@mantine/core';
import { ItemForSale } from '@/src/API';
import { MarketplaceCard } from './MarketplaceCard';
import { ViewListingModal } from './ViewListingModal';
import { useFetchListings } from '@/src/hooks/marketplaceCustomHooks';

export function MarketplaceFeed({
  refresh,
  searchQuery,
}: {
  refresh: boolean;
  searchQuery: string;
}) {
  const { listings, loading } = useFetchListings(refresh);
  const [viewListingModalOpened, setViewListingModalOpened] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleViewListing = (item: any) => {
    setSelectedListing(item);
    setViewListingModalOpened(true);
  };

  const filteredListings = listings.filter(
    (item: ItemForSale) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${item.seller.firstName} ${item.seller.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const sortedListings = filteredListings.sort(
    (a: { createdAt: Date }, b: { createdAt: Date }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      {loading ? (
        <Group justify="center" mt="200">
          <Loader />
        </Group>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={{ base: 5, sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          data-testid="marketplace-feed"
        >
          {sortedListings.map((item: ItemForSale) => (
            <MarketplaceCard key={item.id} item={item} onView={() => handleViewListing(item)} />
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
