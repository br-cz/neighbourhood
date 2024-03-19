import { object, string } from 'yup';

export const createPostSchema = object({
  content: string().required('Content is required').max(500, 'Content must be less than 500 characters').min(3, 'Content must be at least 3 characters'),
});
