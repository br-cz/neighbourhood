import { formatDate, formatTime, formatPostedAt, combineDateTime } from '@/src/utils/timeUtils';

// Test Suite for timeUtils
describe('timeUtils', () => {
  //1.1
  describe('formatDate', () => {
    it('formats ISO date strings to readable dates', () => {
      expect(formatDate('2024-12-12T19:00:00')).toBe('December 12, 2024');
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
});
