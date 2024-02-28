import { object, string, date } from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);
export const createEventSchema = object({
  eventName: string().required('Event name is required'),
  location: string().required('Location is required'),
  time: string().required('Time is required'),
  date: date().min(today, 'Date must be in the future'),
});
