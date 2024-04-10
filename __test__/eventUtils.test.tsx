import { filterAndSortEvents } from '@/src/utils/eventUtils';
import { Visibility } from '@/src/types/types';

const mockSaves = new Map<string, boolean>();

const mockEvents = [
  {
    id: '1',
    name: 'Birthday Party',
    organizer: { id: '13', firstName: 'Alex', lastName: 'Clark', createdAt: '2023-12-21T10:00:00' },
    community: { id: '6', name: 'Test Community' },
    createdAt: '2023-12-20T10:00:00',
    datetime: '2024-01-02:00:00',
    location: 'Test Location',
    visibility: Visibility.PUBLIC,
    _version: 1,
  },
  {
    id: '2',
    name: 'Movie Night',
    organizer: { id: '12', firstName: 'Zoe', lastName: 'Baker', createdAt: '2023-12-21T10:00:00' },
    community: { id: '5', name: 'Test Community' },
    createdAt: '2023-12-18T12:00:00',
    datetime: '2024-01-05T12:00:00',
    location: 'Test Location',
    visibility: Visibility.PUBLIC,
    _version: 1,
  },
  {
    id: '3',
    name: 'BBQ',
    organizer: {
      id: '14',
      firstName: 'Charlie',
      lastName: 'Adams',
      createdAt: '2023-12-21T10:00:00',
    },
    community: { id: '7', name: 'Test Community' },
    createdAt: '2023-12-16T20:00:00',
    datetime: '2024-01-15T20:00:00',
    location: 'Test Location',
    visibility: Visibility.PUBLIC,
    _version: 1,
  },
];

describe('postUtils', () => {
  describe('filterAndSortEvents', () => {
    it('filters posts by content', () => {
      const filtered = filterAndSortEvents(mockEvents, 'party', null, mockSaves);
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Birthday Party');
    });

    it('filters posts by author first name', () => {
      const filtered = filterAndSortEvents(mockEvents, 'zoe', null, mockSaves);
      expect(filtered.length).toBe(1);
      expect(filtered[0].organizer.firstName).toBe('Zoe');
    });

    it('filters posts by author last name', () => {
      const filtered = filterAndSortEvents(mockEvents, 'adams', null, mockSaves);
      expect(filtered.length).toBe(1);
      expect(filtered[0].organizer.lastName).toBe('Adams');
    });

    it('filters posts by full name', () => {
      const filtered = filterAndSortEvents(mockEvents, 'alex clark', null, mockSaves);
      expect(filtered.length).toBe(1);
      expect(filtered[0].organizer.firstName).toBe('Alex');
    });

    it('sorts posts by posted date (new to old)', () => {
      const sorted = filterAndSortEvents(mockEvents, '', 'Newly Posted', mockSaves);
      expect(sorted[0].id).toBe('1');
      expect(sorted[2].id).toBe('3');
    });

    it('filters events for today', () => {
      const today = new Date('2024-01-02T00:00:00');
      jest.useFakeTimers().setSystemTime(today);

      const filtered = filterAndSortEvents(mockEvents, '', 'Today', mockSaves);
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('1');

      jest.useRealTimers();
    });

    it('filters events for this week', () => {
      const thisWeekStart = new Date('2024-01-02T00:00:00');
      jest.useFakeTimers().setSystemTime(thisWeekStart);

      const filtered = filterAndSortEvents(mockEvents, '', 'This Week', mockSaves);
      expect(filtered.length).toBe(2);

      jest.useRealTimers();
    });

    it('filters events for this month', () => {
      const thisMonthStart = new Date('2024-01-02T00:00:00');
      jest.useFakeTimers().setSystemTime(thisMonthStart);

      const filtered = filterAndSortEvents(mockEvents, '', 'This Month', mockSaves);
      expect(filtered.length).toBe(3);

      jest.useRealTimers();
    });
  });
});
