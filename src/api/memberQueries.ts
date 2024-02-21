import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCommunity, getUser } from '@/src/graphql/queries';

const client = generateClient();

export const getCurrentCommunity = async () => {
  const communityId = JSON.parse(localStorage.getItem('currentCommunityID')!);
  const community = await client.graphql({
    query: getCommunity,
    variables: { id: communityId },
  });
  return community.data.getCommunity;
};

export const getUserByID = async (userId: string) => {
  const user = await client.graphql({
    query: getUser,
    variables: { id: userId },
  });
  return user.data.getUser;
};

export const getCurrentUser = async () => {
  const userId = JSON.parse(localStorage.getItem('currentUserID')!);
  return getUserByID(userId);
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        setUser(await getCurrentUser());
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading, error };
};

//TODO: Modify this to use getCurrentCommunity to cut one API call
export const useFetchMembers = () => {
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ListUserCommunities = /* GraphQL */ `
    query ListUserCommunities {
      listUserCommunities {
        nextToken
        startedAt
        items {
          id
          user {
            id
            firstName
            lastName
            username
            profilePic
          }
          communityId
          userId
        }
      }
    }
  `;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        if (!userData) {
          return;
        }
        const fetchedMembers = await client.graphql({
          query: ListUserCommunities,
          variables: { id: userData.selectedCommunity },
        });
        const jsonMembers = JSON.parse(JSON.stringify(fetchedMembers));
        const filteredMembers = jsonMembers.data.listUserCommunities.items.filter(
          (item: any) => item.communityId === userData.selectedCommunity
        );
        setMembers(filteredMembers);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { members, loading, error };
};
