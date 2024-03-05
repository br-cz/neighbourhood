import { object, string } from 'yup';

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const createListingSchema = object({
  title: string()
    .required('Title is required')
    .max(75, 'Title must be 75 characters or less')
    .min(3, 'Title must be at least 3 characters'),
  description: string().max(750, 'Description must be 750 characters or less'),
  price: string().required('Price is required'),
  contact: string()
    .required('Contact is required')
    .matches(phoneRegex, 'Phone number must be valid.'),
});
