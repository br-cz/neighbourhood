import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCommunity } from '../graphql/queries';
import { User } from '../models';

const client = generateClient();

export const useFetchMembers = () => {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const community = await client.graphql({
          query: getCommunity,
          variables: { id: parsedUserData.selectedCommunity },
        });

        setEvents(JSON.stringify(community.data.getCommunity?.members));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { events, loading, error };
};
