import {
  formatDate,
  formatTime,
  formatPostedAt,
  combineDateTime,
  isoToUTC,
  utcToISO,
  dateToAge,
} from '@/utils/timeUtils';

// Test Suite for timeUtils
describe('timeUtils', () => {
  //1.1
  describe('formatDate', () => {
    it('formats ISO date strings to readable dates', () => {
      expect(formatDate('2024-12-12T19:00:00')).toBe('December 12, 2024');
    });
    it('handles invalid date inputs', () => {
      expect(formatDate('not-a-valid-date')).toBe('Invalid Date');
    });
  });

  //1.2
  describe('formatTime', () => {
    it('formats ISO date strings to readable times', () => {
      expect(formatTime('2024-12-12T19:00:00')).toMatch(/^7:00 PM$/);
    });
  });

  //1.3
  describe('formatPostedAt', () => {
    it('returns "Just now" for dates less than a minute ago', () => {
      const now = new Date().toISOString();
      expect(formatPostedAt(now)).toBe('Just now');
    });
    it('handles transitions between time intervals correctly', () => {
      const slightlyLessThanMinute = Date.now() - 59 * 1000;
      const slightlyMoreThanMinute = Date.now() - 61 * 1000;
      expect(formatPostedAt(new Date(slightlyLessThanMinute).toISOString())).toBe('Just now');
      expect(formatPostedAt(new Date(slightlyMoreThanMinute).toISOString())).toBe('1m ago');
    });
  });

  // 1.4
  describe('combineDateTime', () => {
    it('combines date and time into ISO string', () => {
      const date = new Date('2022-01-01');
      const time = '15:00';
      const result = combineDateTime(date, time);
      expect(new Date(result).getHours()).toBe(15);
      expect(new Date(result).getMinutes()).toBe(0);
    });

    it('defaults time to 00:00 if not provided', () => {
      const date = new Date('2022-01-01');
      const time = '';
      const result = combineDateTime(date, time);
      expect(new Date(result).getHours()).toBe(0);
      expect(new Date(result).getMinutes()).toBe(0);
    });
  });

  describe('isoToUTC', () => {
    it('converts ISO date strings to UTC', () => {
      expect(isoToUTC('2023-08-29T10:00:00-05:00')).toMatch(/Tue, 29 Aug 2023 15:00:00 GMT/);
    });

    it('handles invalid ISO date strings', () => {
      expect(isoToUTC('not-an-iso-string')).toBe('Invalid Date');
    });
  });

  describe('utcToISO', () => {
    it('converts Mantine DateValue to ISO strings', () => {
      const dateValue = new Date('2023-08-29');
      expect(utcToISO(dateValue)).toBe('2023-08-28');
    });

    it('handles invalid inputs', () => {
      expect(utcToISO(null)).toBe('');
    });
  });

  describe('dateToAge', () => {
    it('converts ISO date strings to age', () => {
      expect(dateToAge('1990-05-12')).toBe('33');
    });
    it('handles invalid ISO date strings', () => {
      expect(dateToAge('not-an-iso-string')).toBe('NaN');
    });
  });
});
