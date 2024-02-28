import { object, string } from 'yup';

export const createEventSchema = object({
  eventName: string().required('Event name is required'),
  location: string().required('Location is required'),
  time: string().required('Time is required'),
});
