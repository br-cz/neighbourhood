import { notifications } from '@mantine/notifications';
import { Community } from '@/src/API';
import { createUserCommunityAPI } from '@/src/api/services/user';

export const communitySelectHandler = async (
  communityId: string,
  communities: Community[],
  userId: string,
  userCommunities: Community[]
) => {
  const community = communities.find(
    (c: Community) => c.id === communityId
  ) as unknown as Community;

  const isMember = community?.members?.items.some(
    (member: any) => member.userId === userId && !member?._deleted
  );

  if (!isMember && userCommunities?.length < 3) {
    try {
      await createUserCommunityAPI(userId, community.id);
      notifications.show({
        radius: 'md',
        title: 'Community joined',
        message: `You are now part of ${community.name}. Say hi!`,
      });
    } catch (error) {
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
