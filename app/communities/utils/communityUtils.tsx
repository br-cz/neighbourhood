import { notifications } from '@mantine/notifications';
import { switchCommunityAPI } from '@/src/api/services/community';
import { getCurrentCommunityID } from '@/src/hooks/communityCustomHooks';
import { Community, UserCommunity } from '@/src/API';
import { deleteUserCommunityAPI } from '@/src/api/services/user';
import { communityUpdateSubject } from '@/src/hooks/communityCustomHooks';
import { updateUserSelectedCommunity, getCurrentUserAPI } from '@/src/api/services/user';
import { getCurrentUser } from '@/src/hooks/usersCustomHooks';

const triggerCommunityUpdate = () => {
  communityUpdateSubject.next();
};
// Utility function for handling community switch
export const handleSwitch = async (user: any, community: Community, toggleRefresh: () => void) => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    try {
      console.log('Switching to community:', community.id);
      await updateUserSelectedCommunity(currentUser.id, community.id, currentUser._version);
      await switchCommunityAPI(user, community.id);
      console.log('Updated User details: ', await getCurrentUserAPI());
      localStorage.setItem('currentCommunityID', JSON.stringify(community.id));
      localStorage.setItem('currentCommunity', JSON.stringify(community));
      notifications.show({
        radius: 'md',
        title: 'Update!',
        color: 'green',
        message: `You have now switched to ${community.name} community`,
      });
      toggleRefresh();
      triggerCommunityUpdate(); //Trigger community update so that all components start updating the community data
    } catch (error) {
      notifications.show({
        radius: 'md',
        title: 'Sorry!',
        color: 'red',
        message: 'Failed to switch the community. Please try again.',
      });
    }
  }
};

// Utility function for handling community deselect
export const handleDeselect = async (
  user: any,
  community: Community,
  userCommunities: Community[],
  userCommunityList: UserCommunity[],
  toggleRefresh: () => void
) => {
  if (userCommunities.length === 1) {
    notifications.show({
      radius: 'md',
      title: 'Oops!',
      color: 'yellow',
      message: 'You cannot leave the community as you are a member of only one community',
    });
    return;
  }

  const relationship = userCommunityList.find(
    (userCommunity: UserCommunity) =>
      userCommunity.communityId === community.id &&
      userCommunity.userId === user &&
      !userCommunity._deleted
  ) as UserCommunity;
  try {
    console.log('Deleting user community:', relationship.id);
    await deleteUserCommunityAPI(relationship.id);
    notifications.show({
      radius: 'md',
      color: 'grey',
      title: 'We are sorry to see you go!',
      message: `You are no longer part of ${community.name}`,
    });
    if (community.id === getCurrentCommunityID()) {
      const otherCommunities = userCommunities.filter((c) => c.id !== getCurrentCommunityID());

      if (otherCommunities.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherCommunities.length);
        const randomCommunity = otherCommunities[randomIndex];
        handleSwitch(user, randomCommunity, toggleRefresh);
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
