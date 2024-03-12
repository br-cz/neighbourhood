import { sortByFirstName, sortByLastName, sortByNewToOld } from '@/utils/sortUtils';

interface SimplifiedUser {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

describe('peopleUtils', () => {
  const mockUsers: SimplifiedUser[] = [
    { id: '3', firstName: 'Charlie', lastName: 'Adams', createdAt: '2023-12-15' },
    { id: '1', firstName: 'Alex', lastName: 'Clark', createdAt: '2023-12-22' },
    { id: '2', firstName: 'Zoe', lastName: 'Baker', createdAt: '2023-12-20' },
  ];

  describe('sortByFirstName', () => {
    it('sorts users by first name (A-Z)', () => {
      const sorted = mockUsers.sort(sortByFirstName);
      expect(sorted[0].firstName).toBe('Alex');
      expect(sorted[1].firstName).toBe('Charlie');
      expect(sorted[2].firstName).toBe('Zoe');
    });
  });

  describe('sortByLastName', () => {
    it('sorts users by last name (A-Z)', () => {
      const sorted = mockUsers.sort(sortByLastName);
      expect(sorted[0].lastName).toBe('Adams');
      expect(sorted[1].lastName).toBe('Baker');
      expect(sorted[2].lastName).toBe('Clark');
    });
  });

  describe('sortByNewToOld', () => {
    it('sorts users by join date (newest to oldest)', () => {
      const sorted = mockUsers.sort(sortByNewToOld);
      expect(sorted[0].id).toBe('1');
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('3');
    });
  });
});
