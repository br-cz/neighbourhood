import { notifications } from '@mantine/notifications';
import { Community } from '@/src/API';
import { createUserCommunityAPI } from '@/src/api/services/user';

export const communitySelectHandler = async (
  communityId: string,
  communities: Community[],
  user: string,
  userCommunities: Community[]
) => {
  const community = communities.find(
    (c: Community) => c.id === communityId
  ) as unknown as Community;

  const isMember = community?.members?.items.some(
    (member: any) => member.userId === user && !member?._deleted
  );

  if (!isMember && userCommunities?.length < 3) {
    try {
      await createUserCommunityAPI(user, community.id);
      notifications.show({
        radius: 'md',
        title: 'Welcome to your new neighbourhood!',
        color: 'yellow.6',
        message: `You are now part of ${community.name}. Good to have you on board!`,
      });
    } catch (error) {
      console.log(isMember);
      console.log(error);
      console.log(communityId, communities, user, userCommunities);
      notifications.show({
        radius: 'md',
        title: 'Oops!',
        color: 'red',
        message: 'Failed to add your community. Please try again.',
      });
    }
  } else {
    notifications.show({
      radius: 'md',
      title: 'Oops!',
      color: 'red',
      message: `You are already part of ${community.name}`,
    });
  }
};
