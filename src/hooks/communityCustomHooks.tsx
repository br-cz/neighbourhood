import { Subject } from 'rxjs';
import { useState, useEffect } from 'react';
import {
  getAllUserCommunitiesAPI,
  getCommunityAPI,
  getRelevantCommunitiesAPI,
  getAllCommunityDetailsAPI,
} from '../api/services/community';
import { getCurrentUserID } from './usersCustomHooks';
import { retrieveImage as retrieveProfilePicture } from '@/components/utils/s3Helpers/UserProfilePictureS3Helper';

export const communityUpdateSubject = new Subject<void>();

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
        const membersWithImages = await Promise.all(
          filteredMembers.map(async (item: any) => {
            const profilePicture = await retrieveProfilePicture(item.userId).catch(() => null);
            return {
              ...item,
              user: {
                ...item.user,
                profilePic: profilePicture,
              },
            };
          })
        );
        setMembers(membersWithImages);
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

    // Subscribe to current community so that we can update the community data across the app
    // without having to prop drill or creating global contexts
    const subscription = communityUpdateSubject.subscribe({
      next: async () => {
        fetchCurrentCommunity();
      },
    });

    // Cleanup
    return () => subscription.unsubscribe();
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
        const response = await getAllCommunityDetailsAPI();
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

export const useFetchRelevantCommunities = (refresh: boolean = false) => {
  const [relevantCommunities, setRelevantCommunities] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelevantCommunities = async () => {
      try {
        setLoading(true);
        const response = (await getRelevantCommunitiesAPI(getCurrentUserID())) ?? [];
        setRelevantCommunities(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelevantCommunities();
  }, [refresh]);

  return { relevantCommunities, loading, error };
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
