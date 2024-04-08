import { object, string, date } from 'yup';

export const createEventSchema = object({
  eventName: string()
    .required('Event name is required')
    .max(75, 'Event name must be 75 characters or less')
    .min(3, 'Event name must be at least 3 characters'),
  location: string()
    .required('Location is required')
    .max(50, 'Location must be 50 characters or less')
    .min(3, 'Location must be at least 3 characters'),
  time: string().required('Time is required'),
  description: string().max(750, 'Description must be 750 characters or less'),
  date: date(),
});
