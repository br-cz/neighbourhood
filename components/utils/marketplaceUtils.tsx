import {
  sortByPriceHighLow,
  sortByPriceLowHigh,
  sortByNewToOld,
  filterSavedListings,
} from '@/utils/sortUtils';
import { ItemForSale } from '@/types/types';

export const filterAndSortListings = (
  listings: ItemForSale[],
  searchQuery: string,
  sortQuery: string | null,
  userListingSaves: Map<string, boolean>
): ItemForSale[] => {
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
    case 'Newly Listed':
      sortedListings = filteredListings.sort(sortByNewToOld);
      break;
    case 'Price: Low to High':
      sortedListings = filteredListings.sort(sortByPriceLowHigh);
      break;
    case 'Price: High to Low':
      sortedListings = filteredListings.sort(sortByPriceHighLow);
      break;
    case 'Saved':
      sortedListings = filterSavedListings(filteredListings, userListingSaves);
      sortedListings.sort(sortByNewToOld);
      break;
    default:
      sortedListings = filteredListings.sort(sortByNewToOld);
      break;
  }

  return sortedListings;
};
