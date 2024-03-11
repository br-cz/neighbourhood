import { object, string, ref } from 'yup';

export const accountSettingsSchema = object({
  newEmail: string().email('Invalid email format').required('Email is required'),
  oldPassword: string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required'),
  newPassword: string()
    .min(8, 'Password must be 8 characters or more.')
    .notOneOf([ref('oldPassword'), null], 'New password must be different from old password')
    .required('Confirm password is required'),
});
