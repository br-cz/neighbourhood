import { object, string, ref, array } from 'yup';

// Checks for a valid name format - excludes repeating chars and most special chars
const nameRegex = /^(?!.*(.)\1{3})[a-zA-ZÀ-ÿ-_'"]+(?:\s[a-zA-ZÀ-ÿ-_'"]+)*$/;

export const signUpSchema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required')
    .max(14, 'Password must be 14 characters or less.'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: string()
    .required('First name is required')
    .matches(nameRegex, 'First name must be valid')
    .max(20, 'First name must be 20 characters or less'),
  familyName: string()
    .required('Last name is required')
    .matches(nameRegex, 'Last name must be valid')
    .max(20, 'Last name must be 20 characters or less'),
  preferredUsername: string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      'Username can only contain alphanumeric characters, underscores, and hyphens'
    )
    .min(3, 'Username must be 3 characters or more.')
    .max(20, 'Username must be 20 characters or less'),
  address: string().required('Address is required'),
  //selectedCommunity: string().required('Selecting a community is required.'),
  selectedCommunity: array()
    .of(string())
    .min(1, 'You must select at least one community')
    .max(1, 'You can only select one community at a time')
    .required('Selecting a community is required.'),

  phoneNumber: string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Phone number must be valid.'
  ),
});
