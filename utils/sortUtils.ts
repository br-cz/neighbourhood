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

export function sortByCreatedAt(a: any, b: any): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
