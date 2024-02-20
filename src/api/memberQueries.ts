import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { User } from '../models';

const client = generateClient();

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
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const members = await client.graphql({
          query: ListUserCommunities,
          variables: { id: parsedUserData.selectedCommunity },
        });

        const jsonMembers = JSON.parse(JSON.stringify(members));
        const filteredMembers = jsonMembers.data.listUserCommunities.items.filter(
          (item: any) => item.communityId === parsedUserData.selectedCommunity
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
