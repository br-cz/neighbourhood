import { object, string } from 'yup';
import { Visibility } from '@/src/API';

export const createPostSchema = object({
  content: string().required('Content is required'),
});
