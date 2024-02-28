import { useState } from 'react';
import { SimpleGrid } from '@mantine/core';
import { ItemForSale } from '@/src/API';
import { MarketplaceCard } from './MarketplaceCard';
import { ViewListingModal } from './ViewListingModal';

const users = [
  {
    id: '1',
    firstName: 'Bricz',
    lastName: 'Cruz',
    profilePic: 'https://i.pravatar.cc/300',
  },
  {
    id: '2',
    firstName: 'Alborz',
    lastName: 'Khakbazan',
    profilePic: 'https://i.pravatar.cc/400',
  },
  {
    id: '3',
    firstName: 'Gurman',
    lastName: 'Toor',
    profilePic: 'https://i.pravatar.cc/500',
  },
  {
    id: '4',
    firstName: 'Safran',
    lastName: 'Bin Kader',
    profilePic: 'https://i.pravatar.cc/200',
  },
];

const items = [
  {
    id: '1',
    title: 'AirPods Max',
    price: 400,
    seller: users[0],
    contact: '202-555-0199',
    description:
      '*BRAND NEW* AirPods Max wireless headphones, never opened. Retail price is $549.99',
    images: ['https://bit.ly/48tcgzm'],
  },
  {
    id: '2',
    title: 'Old Sony Camcorder w/ Extras',
    price: 140,
    seller: users[1],
    contact: '202-555-0199',
    description: 'Selling my sony handycam. Mint condition and comes with blank dvd...',
    images: ['https://bit.ly/48xyG2q'],
  },
  {
    id: '3',
    title: 'NEW North Face Jacket Never Worn',
    price: 100,
    seller: users[2],
    contact: '202-555-0199',
    description: "men's size Large. Never worn tags still on pickup only",
    images: ['https://bit.ly/48sZmBv'],
  },
  {
    id: '4',
    title: 'lawnmower',
    price: 75,
    seller: users[0],
    contact: '202-555-0199',
    description: 'works good cuts grass. please text me if interested',
    images: ['https://bit.ly/48xADMj'],
  },
  {
    id: '4',
    title: 'New Balance Sneakers',
    price: 90,
    seller: users[3],
    description: 'Mens size 10. Brand new, never worn. Pickup only',
    images: ['https://bit.ly/49mIIEN'],
  },
];

export function MarketplaceFeed() {
  const [viewListingModalOpened, setViewListingModalOpened] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const handleViewListing = (item: any) => {
    setSelectedListing(item);
    setViewListingModalOpened(true);
  };
  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
        spacing={{ base: 5, sm: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
        data-testid="marketplace-feed"
      >
        {items.map((item: ItemForSale) => (
          <MarketplaceCard key={item.id} item={item} onView={() => handleViewListing(item)} />
        ))}
      </SimpleGrid>
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
