import { updatePassword, updateUserAttributes } from '@aws-amplify/auth';
import { notifications } from '@mantine/notifications';
import { updateUserEmailAPI } from '@/src/api/services/user';
import { getCurrentUser } from '@/src/hooks/usersCustomHooks';

export async function handleProfileUpdate(
  oldPassword: string,
  newPassword: string,
  newEmail: string,
) {
  try {
    const user = await getCurrentUser();
    console.log('User info update:', oldPassword, newPassword, newEmail);
    if (newEmail && user!.email !== newEmail) {
      const userAttributes = { email: newEmail };
      await updateUserAttributes({ userAttributes });
      await updateUserEmailAPI(user!.id, newEmail, user!._version);
    }

    if (oldPassword && newPassword && oldPassword !== newPassword) {
      await updatePassword({ oldPassword, newPassword });
    }

    notifications.show({
      radius: 'md',
      title: 'Your login details have been updated!',
      message: "Please don't forget to keep track of these new changes",
    });
  } catch (error: any) {
    console.error('Error updating user info:', error);
    notifications.show({
      color: 'red',
      title: 'Error!',
      message: 'Failed to update your account information - please check your inputs and try again.',
    });
  }
}
