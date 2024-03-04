import { object, string, number, date } from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

const nameRegex = /^(?!.*(.)\1{3})[a-zA-ZÀ-ÿ-_'"]+(?:\s[a-zA-ZÀ-ÿ-_'"]+)*$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const profileSchema = object({
  firstName: string()
    .min(1, 'first name must be 1 character or more')
    .matches(nameRegex, 'first name must be valid')
    .max(20, 'first name must be 20 characters or less'),
  familyName: string()
    .min(1, 'last name must be 1 characters or more')
    .matches(nameRegex, 'last name must be valid')
    .max(20, 'last name must be 20 characters or less'),
  bio: string().max(200, 'bio cannot exceed 200 characters'),
  contact: string().matches(phoneRegex, 'phone number must be valid'),
  date: date().max(today, 'birthday cannot be in the future'),
  kids: number().min(0, 'kids cannot be negative'),
  pets: number().min(0, 'pets cannot be negative'),
});
