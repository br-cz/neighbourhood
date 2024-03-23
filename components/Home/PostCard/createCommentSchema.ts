import { object, string } from 'yup';

export const createCommentSchema = object({
  content: string()
    .required('Content is required and must not be more than 100 characters long')
    .min(1, 'Content must have at least 1 character')
    .max(1000, 'Content cannot be more than 100 characters long'), //some arbitrary limit for database entry and UX
});
