import { useState, useEffect } from 'react';
import {
  getAllUserCommunitiesAPI,
  getCommunityAPI,
  getAllCommunitiesAPI,
  getAllCommunityDetails,
} from '../api/services/community';

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
        const fetchedMembers = await getAllUserCommunitiesAPI(communityId);
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

export const useFetchAllCommunities = (refresh: boolean = false) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCommunities = async () => {
      try {
        setLoading(true);
        const response = await getAllCommunityDetails();
        const allMembers = JSON.parse(JSON.stringify(response));
        setCommunities(allMembers.data.listCommunities.items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCommunities();
  }, [refresh]);

  return { communities, loading, error };
};

export const useFetchAllUserCommunities = (refresh: boolean = false) => {
  const [userCommunityList, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUserCommunities = async () => {
      try {
        setLoading(true);
        const communityId = getCurrentCommunityID();
        const response = await getAllUserCommunitiesAPI(communityId);
        const allUserCommunities = JSON.parse(JSON.stringify(response));
        setCommunities(allUserCommunities.data.listUserCommunities.items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserCommunities();
  }, [refresh]);

  return { userCommunityList, loading, error };
};
