import { object, string } from 'yup';

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const createListingSchema = object({
  title: string().required('Title is required').max(50, 'Title must be 50 characters or less').min(3, 'Title must be at least 3 characters'),
  description: string().max(500, 'Description must be 500 characters or less'),
  price: string().required('Price is required'),
  contact: string().required('Contact is required').matches(phoneRegex, 'Phone number must be valid.')
});
