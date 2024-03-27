import { sortByPriceHighLow, sortByPriceLowHigh, sortByNewToOld } from '@/utils/sortUtils';
import { ItemForSale } from '@/types/types';

export const filterAndSortListings = (
  listings: ItemForSale[],
  searchQuery: string,
  sortQuery: string | null
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
    case 'Price: Low to High':
      sortedListings = filteredListings.sort(sortByPriceLowHigh);
      break;
    case 'Price: High to Low':
      sortedListings = filteredListings.sort(sortByPriceHighLow);
      break;
    case 'Newly Listed':
      sortedListings = filteredListings.sort(sortByNewToOld);
      break;
    default:
      sortedListings = filteredListings;
      break;
  }

  return sortedListings;
};
