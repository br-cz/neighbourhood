import { useState, useEffect } from 'react';
import * as APITypes from '@/src/API';
import { useFetchMembers } from './communityCustomHooks';
import {
  addFriendAPI,
  createFriendRequestAPI,
  deleteFriendRequestAPI,
  fetchAllFriendRequestsAPI,
  getFriendsAPI,
  removeFriendAPI,
} from '../api/services/friend';
import { getUserAPI } from '../api/services/user';

export const useCreateFriendRequest = () => {
  const [friendRequest, sentFriendRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleCreateFriendRequest = async (
    friendRequestData: APITypes.CreateFriendRequestInput
  ) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const updatedFriendRequestData = {
        ...friendRequestData,
        senderId: parsedUserData.id,
      };

      const friendRequestResponse = await createFriendRequestAPI(updatedFriendRequestData);
      console.log('friendRequest created:', friendRequestResponse);

      sentFriendRequest(JSON.stringify(friendRequestResponse));
    } catch (err: any) {
      console.error('Error creating friendRequest:', err);
      setError(err);
    }
  };

  return { friendRequest, error, handleCreateFriendRequest };
};

export const useFetchIncomingFriendRequests = () => {
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Add a state to trigger re-fetch

  const refetch = () => setReload(!reload); // Function to toggle the reload state

  useEffect(() => {
    const fetchedFriendRequests = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('currentUser')!;
        const parsedUserData = JSON.parse(userData);

        const jsonFriendRequests = await fetchAllFriendRequestsAPI();
        const filteredFriendRequests = jsonFriendRequests.items
          .filter((item: any) => item.receiver.id === parsedUserData.id && !item._deleted)
          .map((item: any) => item.sender); // Extract the sender information from each filtered item

        setIncomingFriendRequests(filteredFriendRequests);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchedFriendRequests();
  }, [reload]);

  return { incomingFriendRequests, loading, error, refetch };
};

export const useFetchOutgoingFriendRequests = () => {
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Add a state to trigger re-fetch

  const refetch = () => setReload(!reload); // Function to toggle the reload state

  useEffect(() => {
    const fetchedFriendRequests = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('currentUser')!;
        const parsedUserData = JSON.parse(userData);

        const jsonFriendRequests = await fetchAllFriendRequestsAPI();

        const filteredFriendRequests = jsonFriendRequests.items
          .filter((item: any) => item.sender.id === parsedUserData.id && !item._deleted)
          .map((item: any) => item.receiver); // Extract the sender information from each filtered item

        setOutgoingFriendRequests(filteredFriendRequests);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchedFriendRequests();
  }, [reload]);

  return { outgoingFriendRequests, loading, error, refetch };
};

export const useDeleteIncomingFriendRequest = () => {
  const [deletedRequest, setDeletedRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleDeleteIncomingFriendRequest = async (friendId: string) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const jsonFriendRequests = await fetchAllFriendRequestsAPI();

      const filteredUserFriendRequests = jsonFriendRequests.items.filter(
        (item: any) =>
          item.receiver.id === parsedUserData.id && item.sender.id === friendId && !item._deleted
      );

      if (filteredUserFriendRequests.length > 0) {
        try {
          const deletedFriendRequest = await deleteFriendRequestAPI(
            filteredUserFriendRequests[0].id,
            filteredUserFriendRequests[0]._version
          );
          setDeletedRequest(JSON.stringify(deletedFriendRequest));
        } catch (caughtError) {
          console.error('Error deleting friend request:', caughtError);
        }
      }
    } catch (err: any) {
      console.error('Error deleting friendRequest:', err);
      setError(err);
    }
  };

  return { deletedRequest, error, handleDeleteIncomingFriendRequest };
};

export const useDeleteOutgoingFriendRequest = () => {
  const [deletedRequest, setDeletedRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleDeleteOutgoingFriendRequest = async (friendId: string) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const jsonFriendRequests = await fetchAllFriendRequestsAPI();

      const filteredFriendUserRequests = jsonFriendRequests.items.filter(
        (item: any) =>
          item.receiver.id === friendId && item.sender.id === parsedUserData.id && !item._deleted
      );

      if (filteredFriendUserRequests.length > 0) {
        try {
          const deletedFriendRequest = await deleteFriendRequestAPI(
            filteredFriendUserRequests[0].id,
            filteredFriendUserRequests[0]._version
          );
          setDeletedRequest(JSON.stringify(deletedFriendRequest));
        } catch (caughtError) {
          console.error('Error deleting friend request:', caughtError);
        }
      }
    } catch (err: any) {
      console.error('Error deleting friendRequest:', err);
      setError(err);
    }
  };

  return { deletedRequest, error, handleDeleteOutgoingFriendRequest };
};

const addFriend = async (userId: string, newFriendId: string) => {
  try {
    const userResponse = await getUserAPI(userId);

    if (!userResponse) {
      throw new Error('User not found');
    }

    const updateResponse = await addFriendAPI(userId, newFriendId);
    return updateResponse;
  } catch (error) {
    console.error('Error in addFriend:', error);
  }

  return null;
};

export const useCreateFriend = () => {
  const [friend, setFriend] = useState<string>('');
  const [error, setError] = useState('');
  const { handleDeleteIncomingFriendRequest } = useDeleteIncomingFriendRequest();
  const { handleDeleteOutgoingFriendRequest } = useDeleteOutgoingFriendRequest();

  const handleCreateFriend = async (newFriendId: string) => {
    try {
      const localUserData = localStorage.getItem('currentUser')!;
      const parsedLocalUserData = JSON.parse(localUserData);

      const user = await addFriend(parsedLocalUserData.id, newFriendId);
      await addFriend(newFriendId, parsedLocalUserData.id);

      handleDeleteIncomingFriendRequest(newFriendId);
      handleDeleteOutgoingFriendRequest(newFriendId);

      setFriend(JSON.stringify(user));
    } catch (err: any) {
      console.error('Error creating friend:', err);
      setError(err);
    }
  };

  return { friend, error, handleCreateFriend };
};

export const useDeleteFriend = () => {
  const [deletedFriend, setDeletedFriend] = useState<string>('');
  const [error, setError] = useState('');

  const handleDeleteFriend = async (newFriendId: string) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const res = await removeFriendAPI(parsedUserData.id, newFriendId);
      await removeFriendAPI(newFriendId, parsedUserData.id);

      setDeletedFriend(JSON.parse(JSON.stringify(res)));
      console.log('Friendship deleted successfully');
    } catch (err: any) {
      console.error('Error deleting friend:', err);
      setError(err);
      throw err;
    }
  };

  return { deletedFriend, error, handleDeleteFriend };
};

const fetchFriendsInfo = async (friendsIds: string[]) => {
  try {
    const friendsInfo = await Promise.all(friendsIds.map(getUserAPI));

    return friendsInfo; // This is an array of friends' information
  } catch (error) {
    console.error("Error fetching friends' information:", error);
  }
  return null;
};

export const useFetchFriends = () => {
  const [friends, setFriend] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('currentUser');
        const parsedUserData = JSON.parse(userData!);

        const friendsIds = await getFriendsAPI(parsedUserData.id);
        const parsedFriendIds = JSON.parse(JSON.stringify(friendsIds));
        console.log(parsedFriendIds);

        const friendsInfo = await fetchFriendsInfo(parsedFriendIds);
        console.log(friendsInfo);
        setFriend(friendsInfo);
      } catch (err: any) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { friends, loading, error };
};

export const useFetchCommunityMembers = () => {
  const [noneFriends, setNoneFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { members } = useFetchMembers();
  const { friends } = useFetchFriends();
  const { incomingFriendRequests } = useFetchIncomingFriendRequests();
  const { outgoingFriendRequests } = useFetchOutgoingFriendRequests();
  const [reload, setReload] = useState(false); // Add a state to trigger re-fetch

  const refetch = () => setReload(!reload); // Function to toggle the reload state

  useEffect(() => {
    // Ensure members is defined and not empty before proceeding
    if (!members || members.length === 0) return;

    const fetchFriends = async () => {
      try {
        const userData = localStorage.getItem('currentUser')!;
        const parsedUserData = JSON.parse(userData);

        const membersWithoutUser = members.filter(
          (member: any) => member.user.id !== parsedUserData.id
        );

        const friendIdsLookup = new Map();
        friends
          .map((member: any) => member.id)
          .forEach((friendId: string) => {
            friendIdsLookup.set(friendId, true);
          });
        const outgoingIdsLookup = new Map();
        outgoingFriendRequests
          .map((member: any) => member.id)
          .forEach((outgoingId: string) => {
            outgoingIdsLookup.set(outgoingId, true);
          });
        const incomingIdsLookup = new Map();
        incomingFriendRequests
          .map((member: any) => member.id)
          .forEach((incomingId: string) => {
            incomingIdsLookup.set(incomingId, true);
          });

        const noRelationshipFriends = membersWithoutUser
          .filter((member: any) => !friendIdsLookup.has(member.user.id))
          .map((member: any) => member.user)
          .filter((member: any) => !incomingIdsLookup.has(member.id))
          .filter((member: any) => !outgoingIdsLookup.has(member.id));

        setNoneFriends(noRelationshipFriends);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [members, friends, incomingFriendRequests, outgoingFriendRequests]);

  return {
    friends,
    incomingFriendRequests,
    outgoingFriendRequests,
    noneFriends,
    refetch,
    loading,
    error,
  };
};
