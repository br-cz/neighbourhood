import { useState } from 'react';
import { Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { ItemForSale } from '@/src/API';
import { MarketplaceCard } from './MarketplaceCard';
import { ViewListingModal } from './ViewListingModal';
import { useFetchListings } from '@/src/hooks/marketplaceCustomHooks';
import { sortByCreatedAt, sortByPriceHighLow, sortByPriceLowHigh } from './marketplaceSort';

export function MarketplaceFeed({
  refresh,
  searchQuery,
  sortQuery,
}: {
  refresh: boolean;
  searchQuery: string;
  sortQuery: string | null;
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

  let sortedListings: ItemForSale[] = [];
  switch (sortQuery) {
    case 'Price: Low to High':
      sortedListings = filteredListings.sort(sortByPriceLowHigh);
      break;
    case 'Price: High to Low':
      sortedListings = filteredListings.sort(sortByPriceHighLow);
      break;
    case 'Newly Listed':
      sortedListings = filteredListings.sort(sortByCreatedAt);
      break;
    default:
      sortedListings = filteredListings;
      break;
  }

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
      ) : filteredListings.length === 0 ? (
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
