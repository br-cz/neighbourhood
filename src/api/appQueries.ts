import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCommunity, getUser } from '@/src/graphql/queries';

const client = generateClient();

export const getCurrentUserID = () => JSON.parse(localStorage.getItem('currentUserID')!);
export const getCurrentCommunityID = () => JSON.parse(localStorage.getItem('currentCommunityID')!);

export const getUserByID = async (userId: string) => {
  const user = await client.graphql({
    query: getUser,
    variables: { id: userId },
  });
  return user.data.getUser;
};

export const getCommunityByID = async (communityId: string) => {
  const community = await client.graphql({
    query: getCommunity,
    variables: { id: communityId },
  });
  return community.data.getCommunity;
};

export const getCurrentUser = async () => getUserByID(getCurrentUserID());
export const getCurrentCommunity = async () => getCommunityByID(getCurrentCommunityID());

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

export const useCurrentCommunity = () => {
  const [community, setCommunity] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentCommunity = async () => {
      try {
        setLoading(true);
        setCommunity(await getCurrentCommunity());
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentCommunity();
  }, []);

  return { community, loading, error };
};
