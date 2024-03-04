export function sortAlphabetical(a: any, b: any): number {
  const nameA = a.firstName.toLowerCase();
  const nameB = b.firstName.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
