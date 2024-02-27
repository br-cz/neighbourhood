import { useState, useEffect } from 'react';
import { getAllUserCommunities, getCommunityAPI } from '../api/services/community';

export const getCurrentCommunityID = () => JSON.parse(localStorage.getItem('currentCommunityID')!);
export const getCurrentCommunity = async () => getCommunityAPI(getCurrentCommunityID());

export const useFetchMembers = () => {
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const communityId = getCurrentCommunityID();
        const fetchedMembers = await getAllUserCommunities(communityId);
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
