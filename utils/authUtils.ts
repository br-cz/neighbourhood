import { notifications } from '@mantine/notifications';
import { getCurrentUser, signIn, signOut } from '@aws-amplify/auth';
import { generateClient } from '@aws-amplify/api';
import { getCommunity, getUser } from '@/src/graphql/queries';

const client = generateClient({});

interface SignInParams {
  username: string;
  password: string;
  router: any;
  firstLogin?: boolean;
  firstName?: string;
  handlers?: any;
  setErrorMessage?: (message: string) => void;
}

interface SignOutParams {
  router: any;
}

export async function handleSignIn({
  username,
  password,
  router,
  firstLogin,
  firstName,
  handlers,
  setErrorMessage,
}: SignInParams): Promise<void> {
  await signOut({ global: true });
  try {
    await signIn({ username, password });
    const { userId } = await getCurrentUser();

    const user = await client.graphql({ query: getUser, variables: { id: userId } });
    localStorage.setItem('currentUserID', JSON.stringify(userId));
    localStorage.setItem('currentUser', JSON.stringify(user.data.getUser));

    if (user.data.getUser) {
      const communityID = user.data.getUser.selectedCommunity;
      const community = await client.graphql({
        query: getCommunity,
        variables: { id: communityID },
      });
      localStorage.setItem('currentCommunityID', JSON.stringify(communityID));
      localStorage.setItem('currentCommunity', JSON.stringify(community.data.getCommunity));
      console.log('Logged in user:', user.data.getUser);
      console.log('Logged in community:', community.data.getCommunity);
      console.log('Logged in with ID:', userId);
      console.log('Logged in with community ID:', communityID);
    }
  } catch (error) {
    handlers.close();
    console.log('Error signing in', error);
    if (setErrorMessage) {
      setErrorMessage('Oops! Check your details and try again.');
    }
  } finally {
    router.push('/dashboard');
    if (firstLogin) {
      notifications.show({
        radius: 'md',
        title: 'Hey, Neighbour! 👋 ',
        message: `Welcome to your new community, ${firstName}!`,
      });
    } else {
      notifications.show({
        radius: 'md',
        title: 'Hey, Neighbour! 👋 ',
        message: 'Logged in successfully. Welcome back to your community!',
      });
    }
  }
}

export async function handleSignOut({ router }: SignOutParams) {
  try {
    await signOut({ global: true });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserID');
    localStorage.removeItem('currentCommunity');
    localStorage.removeItem('currentCommunityID');
    console.log('Signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  } finally {
    router.push('/');
    notifications.show({
      radius: 'md',
      title: 'Logged out!',
      message: 'Log back in to continue using Neighborhood.',
    });
  }
}
