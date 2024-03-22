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
    const generatePastDate = (interval: string, unitsAgo: number) => {
      const date = new Date();
      switch (interval) {
        case 'm':
          date.setMinutes(date.getMinutes() - unitsAgo);
          break;
        case 'h':
          date.setHours(date.getHours() - unitsAgo);
          break;
        case 'd':
          date.setDate(date.getDate() - unitsAgo);
          break;
        case 'w':
          date.setDate(date.getDate() - unitsAgo * 7);
          break;
        case 'mo':
          date.setMonth(date.getMonth() - unitsAgo);
          break;
        case 'y':
          date.setFullYear(date.getFullYear() - unitsAgo);
          break;
        default:
          throw new Error('Invalid interval');
      }
      return date.toISOString();
    };

    it('returns "Just now" for dates less than a minute ago', () => {
      const now = new Date().toISOString();
      expect(formatPostedAt(now)).toBe('Just now');
    });

    it('handles minutes ago correctly', () => {
      const fiveMinutesAgo = generatePastDate('m', 5);
      const fiftyNineMinutesAgo = generatePastDate('m', 59);
      expect(formatPostedAt(fiveMinutesAgo)).toBe('5m ago');
      expect(formatPostedAt(fiftyNineMinutesAgo)).toBe('59m ago');
    });

    it('handles hours ago correctly', () => {
      const twoHoursAgo = generatePastDate('h', 2);
      const twentyThreeHoursAgo = generatePastDate('h', 23);
      expect(formatPostedAt(twoHoursAgo)).toBe('2h ago');
      expect(formatPostedAt(twentyThreeHoursAgo)).toBe('23h ago');
    });

    it('handles days ago correctly', () => {
      const threeDaysAgo = generatePastDate('d', 3);
      const sixDaysAgo = generatePastDate('d', 6);
      expect(formatPostedAt(threeDaysAgo)).toBe('3d ago');
      expect(formatPostedAt(sixDaysAgo)).toBe('6d ago');
    });

    it('handles weeks ago correctly', () => {
      const oneWeekAgo = generatePastDate('w', 1);
      const threeWeeksAgo = generatePastDate('w', 3);
      expect(formatPostedAt(oneWeekAgo)).toBe('1w ago');
      expect(formatPostedAt(threeWeeksAgo)).toBe('3w ago');
    });

    it('handles months ago correctly', () => {
      const threeMonthsAgo = generatePastDate('mo', 4);
      const elevenMonthsAgo = generatePastDate('mo', 11);
      expect(formatPostedAt(threeMonthsAgo)).toBe('3mo ago');
      expect(formatPostedAt(elevenMonthsAgo)).toBe('11mo ago');
    });

    it('handles years ago correctly', () => {
      const twoYearsAgo = generatePastDate('y', 2);
      expect(formatPostedAt(twoYearsAgo)).toBe('2y ago');
    });

    it('returns "A long time ago" for very old dates', () => {
      const ancientDate = new Date('1990-01-01').toISOString();
      expect(formatPostedAt(ancientDate)).toBe('A long time ago');
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

  //1.5
  describe('isoToUTC', () => {
    it('converts ISO date strings to UTC', () => {
      expect(isoToUTC('2023-08-29T10:00:00-05:00')).toMatch(/Tue, 29 Aug 2023 15:00:00 GMT/);
    });

    it('handles invalid ISO date strings', () => {
      expect(isoToUTC('not-an-iso-string')).toBe('Invalid Date');
    });
  });

  //1.6
  describe('utcToISO', () => {
    it('converts Mantine DateValue to ISO strings', () => {
      const dateValue = new Date('2023-08-29');
      expect(utcToISO(dateValue)).toBe('2023-08-29');
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
