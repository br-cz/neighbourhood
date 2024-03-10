import { Community } from '@/src/API';
import { notifications } from '@mantine/notifications';
import { createUserCommunityAPI } from '@/src/api/services/user';

export const commmunitySelectHandler = async (
  communityId: string,
  communities: Community[],
  user: string,
  userCommunities: Community[]
) => {
  const community = communities.find(
    (community: Community) => community.id === communityId
  ) as unknown as Community;

  const isMember = community?.members?.items.some(
    (member: any) => member.userId === user && !member?._deleted
  );

  if (!isMember && userCommunities?.length < 3) {
    try {
      await createUserCommunityAPI(user, community.id);
      notifications.show({
        radius: 'md',
        title: 'Yay!',
        color: 'green',
        message: `You are now part of ${community.name}`,
      });
    } catch (error) {
      notifications.show({
        radius: 'md',
        title: 'Sorry!',
        color: 'red',
        message: 'Failed to add your community. Please try again.',
      });
    }
  } else if (!isMember && userCommunities?.length >= 3) {
    //Probably redundant, as the formik validation + higher level checks should prevent this.
    notifications.show({
      radius: 'md',
      title: 'Oops!',
      color: 'yellow',
      message: 'You can only join a maximum of 3 communities',
    });
  } else {
    notifications.show({
      radius: 'md',
      title: 'Oops!',
      color: 'yellow',
      message: `You are already part of ${community.name}`,
    });
  }
};
