import { filterAndSortPosts } from '@/components/utils/postUtils';
import { Visibility } from '@/types/types';

const mockPosts = [
  {
    id: '2',
    content: 'Hello',
    author: { id: '12', firstName: 'Zoe', lastName: 'Baker', createdAt: '2023-12-21T10:00:00' },
    community: { id: '5', name: 'Test Community' },
    createdAt: '2023-12-20T12:00:00',
    visibility: Visibility.PUBLIC,
    comments: { items: [] },
    _version: 1,
  },
  {
    id: '1',
    content: 'World',
    author: { id: '13', firstName: 'Alex', lastName: 'Clark', createdAt: '2023-12-21T10:00:00' },
    community: { id: '6', name: 'Test Community' },
    createdAt: '2023-12-26T10:00:00',
    visibility: Visibility.PUBLIC,
    comments: { items: [] },
    _version: 1,
  },
  {
    id: '3',
    content: 'Test',
    author: { id: '14', firstName: 'Charlie', lastName: 'Adams', createdAt: '2023-12-21T10:00:00' },
    community: { id: '7', name: 'Test Community' },
    createdAt: '2023-12-16T20:00:00',
    visibility: Visibility.PUBLIC,
    comments: { items: [] },
    _version: 1,
  },
];

describe('postUtils', () => {
  describe('filterAndSortPosts', () => {
    it('filters posts by content', () => {
      const filtered = filterAndSortPosts(mockPosts, 'world', null);
      expect(filtered.length).toBe(1);
      expect(filtered[0].content).toBe('World');
    });

    it('filters posts by author first name', () => {
      const filtered = filterAndSortPosts(mockPosts, 'zoe', null);
      expect(filtered.length).toBe(1);
      expect(filtered[0].author.firstName).toBe('Zoe');
    });

    it('filters posts by author last name', () => {
      const filtered = filterAndSortPosts(mockPosts, 'adams', null);
      expect(filtered.length).toBe(1);
      expect(filtered[0].author.lastName).toBe('Adams');
    });

    it('filters posts by full name', () => {
      const filtered = filterAndSortPosts(mockPosts, 'alex clark', null);
      expect(filtered.length).toBe(1);
      expect(filtered[0].author.firstName).toBe('Alex');
    });

    it('sorts posts by date (new to old)', () => {
      const sorted = filterAndSortPosts(mockPosts, '', 'Newly Posted');
      expect(sorted[0].id).toBe('1');
      expect(sorted[2].id).toBe('3');
    });

    it('sorts posts by date (old to new)', () => {
      const sorted = filterAndSortPosts(mockPosts, '', 'Oldest');
      expect(sorted[0].id).toBe('3');
      expect(sorted[2].id).toBe('1');
    });
  });
});
