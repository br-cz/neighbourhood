export function sortByCreatedAt(a: any, b: any): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function sortByPriceLowHigh(a: any, b: any): number {
  return a.price - b.price;
}

export function sortByPriceHighLow(a: any, b: any): number {
  return b.price - a.price;
}
