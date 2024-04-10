import { notifications } from '@mantine/notifications';
import { switchCommunityAPI } from '@/src/api/services/community';
import { getCurrentUser } from '@/src/hooks/usersCustomHooks';
import { getCurrentCommunityID, communityUpdateSubject } from '@/src/hooks/communityCustomHooks';
import { updateUserSelectedCommunity, deleteUserCommunityAPI } from '@/src/api/services/user';
import { Community, UserCommunity } from '@/src/API';

export const SCHOOL_COMMUNITY_IDS = [
  'd2130b0b-f831-4d98-92f9-920095bbd77e',
  '6dac446a-83aa-441f-82b0-0b5d474a92ce',
  '2b278358-f517-46db-81f0-8ea460d7d75b',
  'e06f283b-a890-487c-965a-1e5eacc59fd8',
  '17b85438-7fcf-4f78-b5ef-cee07c6dedae',
];

const triggerCommunityUpdate = () => {
  communityUpdateSubject.next();
};

export const switchCommunity = async (
  user: any,
  community: Community,
  setSelectedCommunity: (communityId: string) => void
) => {
  setSelectedCommunity(community.id);
  const currentUser = await getCurrentUser();
  if (currentUser) {
    try {
      await updateUserSelectedCommunity(currentUser.id, community.id, currentUser._version);
      await switchCommunityAPI(user, community.id);
      localStorage.setItem('currentCommunityID', JSON.stringify(community.id));
      localStorage.setItem('currentCommunity', JSON.stringify(community));
      notifications.show({
        radius: 'md',
        title: 'Community switched!',
        message: `You are now viewing content from the ${community.name} community.`,
      });
      triggerCommunityUpdate();
    } catch (error) {
      notifications.show({
        radius: 'md',
        title: 'Oops!',
        color: 'red',
        message: 'Failed to switch the community. Please try again.',
      });
    }
  }
};

export const leaveCommunity = async (
  user: any,
  community: Community,
  userCommunities: Community[],
  userCommunityList: UserCommunity[],
  setSelectedCommunity: (communityId: string) => void,
  toggleRefresh: () => void
) => {
  const relationship = userCommunityList.find(
    (userCommunity: UserCommunity) =>
      userCommunity.communityId === community.id &&
      userCommunity.userId === user &&
      !userCommunity._deleted
  ) as UserCommunity;
  try {
    await deleteUserCommunityAPI(relationship.id);
    notifications.show({
      radius: 'md',
      title: 'Sorry to see you go!',
      message: `You are no longer part of ${community.name}. Your neighbours will miss you!`,
    });
    if (community.id === getCurrentCommunityID()) {
      const otherCommunities = userCommunities.filter((c) => c.id !== getCurrentCommunityID());

      if (otherCommunities.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherCommunities.length);
        const randomCommunity = otherCommunities[randomIndex];
        switchCommunity(user, randomCommunity, setSelectedCommunity);
      }
    }
    toggleRefresh();
  } catch (error) {
    notifications.show({
      radius: 'md',
      color: 'red',
      title: 'Sorry!',
      message: 'Failed to leave the community. Please try again.',
    });
  }
};
