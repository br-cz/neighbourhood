import { Event, ItemForSale, Post } from '@/types/types';

export function sortByFirstName(a: any, b: any): number {
  const nameA = a?.firstName?.toLowerCase();
  const nameB = b?.firstName?.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function sortByLastName(a: any, b: any): number {
  const nameA = a?.lastName?.toLowerCase();
  const nameB = b?.lastName?.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function sortByNewToOld(a: any, b: any): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function sortByOldToNew(a: any, b: any): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function sortByLikeCount(a: Post, b: Post): number {
  return b.likeCount! - a.likeCount!;
}

export function sortByPriceLowHigh(a: ItemForSale, b: ItemForSale): number {
  return a.price - b.price;
}

export function sortByPriceHighLow(a: ItemForSale, b: ItemForSale): number {
  return b.price - a.price;
}

export function filterSavedListings(
  listings: ItemForSale[],
  saved: Map<string, boolean>
): ItemForSale[] {
  return listings.filter((listing) => saved.has(listing.id));
}

export function sortByEventDate(a: Event, b: Event): number {
  return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
}
