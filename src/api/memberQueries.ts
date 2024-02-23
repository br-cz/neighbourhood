import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentCommunityID } from '@/src/api/appQueries';

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
        const communityId = getCurrentCommunityID();
        const fetchedMembers = await client.graphql({
          query: ListUserCommunities,
          variables: { id: communityId },
        });
        const jsonMembers = JSON.parse(JSON.stringify(fetchedMembers));
        const filteredMembers = jsonMembers.data.listUserCommunities.items.filter(
          (item: any) => item.communityId === communityId
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
