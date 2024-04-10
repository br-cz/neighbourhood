import { updatePassword, updateUserAttributes } from '@aws-amplify/auth';
import { notifications } from '@mantine/notifications';
import { updateUserEmailAPI } from '@/src/api/services/user';
import { getCurrentUser } from '@/src/hooks/usersCustomHooks';

export async function handleProfileUpdate(
  oldPassword: string,
  newPassword: string,
  newEmail: string,
  onClose: () => void,
  resetForm: () => void
) {
  try {
    const user = await getCurrentUser();
    let notificationTitle = '';

    if (oldPassword && newPassword) {
      await updatePassword({ oldPassword, newPassword });
      notificationTitle = 'Your password has been updated!';
    }

    if (newEmail && user!.email !== newEmail) {
      const userAttributes = { email: newEmail };
      await updateUserAttributes({ userAttributes });
      await updateUserEmailAPI(user!.id, newEmail, user!._version);
      notificationTitle = 'Your email has been updated!';
    }

    if (newEmail && newPassword) {
      notificationTitle = 'Your login details have been updated!';
    }

    notifications.show({
      radius: 'md',
      title: notificationTitle,
      message: "Please don't forget to keep track of these new changes",
    });

    onClose();
    resetForm();
  } catch (error: any) {
    console.error('Error updating user info:', error);

    let errorMessage =
      'Failed to update your account information - please check your inputs and try again.';

    if (error.message.includes('Incorrect username or password')) {
      errorMessage = 'Your old password is incorrect. Please try again.';
    }
    if (error.message.includes('Attempt limit exceeded')) {
      errorMessage = 'Too many attempts. Please try again later.';
      onClose();
      resetForm();
    }

    notifications.show({
      radius: 'md',
      color: 'red',
      title: 'Oops!',
      message: errorMessage,
    });
  }
}
