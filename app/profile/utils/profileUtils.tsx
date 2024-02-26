import { updatePassword, updateUserAttributes } from 'aws-amplify/auth';
import { notifications } from '@mantine/notifications';
import { updateUserEmail } from '@/src/api/userQueries';
import { getCurrentUser } from '@/src/api/appQueries';

export async function handleProfileUpdate(
  oldPassword: string,
  newPassword: string,
  newEmail: string,
  setErrorMessage: any,
  setNewEmail: any,
  setOldPassword: any,
  setNewPassword: any,
  handlers: any
) {
  try {
    const user = await getCurrentUser();
    console.log('User info update:', oldPassword, newPassword, newEmail);
    if (newEmail && user!.email !== newEmail) {
      const userAttributes = { email: newEmail };
      await updateUserAttributes({ userAttributes });
      await updateUserEmail(user!.id, newEmail, user!._version);
    }

    if (oldPassword && newPassword && oldPassword !== newPassword) {
      await updatePassword({ oldPassword, newPassword });
    }

    setErrorMessage('');
    setNewEmail('');
    setOldPassword('');
    setNewPassword('');
    notifications.show({
      radius: 'md',
      title: 'Your login details have been updated!',
      message: "Please don't forget to keep track of these new changes",
    });
  } catch (error: any) {
    console.error('Error updating user info:', error);
    setErrorMessage(error.message || 'Failed to update profile.');
  } finally {
    handlers.close();
  }
}
