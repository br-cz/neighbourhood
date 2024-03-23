import { notifications } from '@mantine/notifications'; // Assuming a type exists
import { signOut } from '@aws-amplify/auth';

interface HandleSignOutParams {
  router: any;
}

export async function utilSignOut({ router }: HandleSignOutParams) {
  try {
    await signOut({ global: true });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserID');
    localStorage.removeItem('currentCommunity');
    localStorage.removeItem('currentCommunityID');
    router.push('/');
    notifications.show({
      radius: 'md',
      title: 'Logged out!',
      message: 'Log back in to continue using Neighborhood.',
    });
    console.log('Signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
