import { object, string, ref } from 'yup';

export const accountSettingsSchema = object({
  oldPassword: string().required('Current password is required'),
  newEmail: string().email('Invalid email format').nullable(true),
  newPassword: string()
    .nullable(true)
    .notOneOf([ref('oldPassword'), null], 'New password must be different from old password')
    .min(8, 'New password must be 8 characters or more.'),
});
