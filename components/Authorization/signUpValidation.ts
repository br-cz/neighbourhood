import { object, string, ref } from 'yup';

export const signUpSchema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string().required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  name: string().required('First name is required'),
  family_name: string().required('Family name is required'),
  preferred_username: string().required('Preferred username is required'),
  address: string().required('Address is required'),
});
