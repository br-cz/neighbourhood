import { object, string, ref, array } from 'yup';

export const signUpSchema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: string().required('First name is required'),
  familyName: string().required('Family name is required'),
  preferredUsername: string().required('Preferred username is required'),
  address: string().required('Address is required'),
  selectedCommunity: string().required('Selecting a community is required.'),
  phoneNumber: string(),
});
