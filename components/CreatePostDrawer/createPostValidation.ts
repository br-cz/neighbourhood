import { object, string } from 'yup';

export const createPostSchema = object({
  content: string().required('Content is required'),
});
