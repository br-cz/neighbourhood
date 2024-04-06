import { sortByPriceHighLow, sortByPriceLowHigh, sortByNewToOld } from '@/utils/sortUtils';
import { ItemForSale } from '@/types/types';

export const filterAndSortListings = (
  listings: ItemForSale[],
  searchQuery: string,
  sortQuery: string | null,
  userListingSaves: Map<string, boolean>
): ItemForSale[] => {
  let filteredListings = listings.filter(
    (item: ItemForSale) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${item.seller.firstName} ${item.seller.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  switch (sortQuery) {
    case 'Newly Listed':
      filteredListings = filteredListings.sort(sortByNewToOld);
      break;
    case 'Price: Low to High':
      filteredListings = filteredListings.sort(sortByPriceLowHigh);
      break;
    case 'Price: High to Low':
      filteredListings = filteredListings.sort(sortByPriceHighLow);
      break;
    case 'Saved':
      filteredListings = filteredListings.filter((listing) => userListingSaves.has(listing.id));
      filteredListings.sort(sortByNewToOld);
      break;
    default:
      filteredListings = filteredListings.sort(sortByNewToOld);
      break;
  }

  return filteredListings;
};
