import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCommunity, getUser } from '@/src/graphql/queries';
import * as APITypes from '../API';
import { createFriendRequest, deleteFriendRequest, updateUser } from '../graphql/mutations';
import { useFetchMembers } from '@/src/api/memberQueries';
import { colorResolver } from '@mantine/core/lib/core/Box/style-props/resolvers/color-resolver/color-resolver';

const client = generateClient();

export const useCreateFriendRequest = () => {
  const [friendRequest, sentFriendRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleCreateFriendRequest = async (
    friendRequestData: APITypes.CreateFriendRequestInput
  ) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      friendRequestData.senderId = parsedUserData.id;

      const friendRequest = await client.graphql({
        query: createFriendRequest,
        variables: { input: friendRequestData },
      });
      console.log('friendRequest created:', friendRequest);

      sentFriendRequest(JSON.stringify(friendRequest));
    } catch (err: any) {
      console.error('Error creating friendRequest:', err);
      setError(err);
    }
  };

  return { friendRequest, error, handleCreateFriendRequest };
};

const fetchAllFriendRequests = async () => {
  const ListFriendRequests = /* GraphQL */ `
    query ListFriendRequests {
      listFriendRequests {
        items {
          id
          _deleted
          _version
          receiver {
            id
            firstName
            lastName
            username
            profilePic
          }
          sender {
            id
            firstName
            lastName
            username
            profilePic
          }
        }
      }
    }
  `;

  try {
    const fetchedFriendRequest = await client.graphql({
      query: ListFriendRequests,
    });

    const jsonFriendRequests = JSON.parse(JSON.stringify(fetchedFriendRequest));
    return jsonFriendRequests.data.listFriendRequests;
  } catch (error) {
    console.error('Error listing all friend requests:', error);
  }
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

        const jsonFriendRequests = await fetchAllFriendRequests();
        const filteredFriendRequests = jsonFriendRequests.items
          .filter((item: any) => {
            return item.receiver.id === parsedUserData.id && !item._deleted;
          })
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

export const useDeleteIncomingFriendRequest = () => {
  const [deletedRequest, setDeletedRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleDeleteIncomingFriendRequest = async (friendId: string) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const jsonFriendRequests = await fetchAllFriendRequests();

      const filteredUserFriendRequests = jsonFriendRequests.items.filter((item: any) => {
        return (
          item.receiver.id === parsedUserData.id && item.sender.id === friendId && !item._deleted
        );
      });

      if (filteredUserFriendRequests.length > 0) {
        try {
          const deletedFriendRequest = await client.graphql({
            query: deleteFriendRequest,
            variables: {
              input: {
                id: filteredUserFriendRequests[0].id,
                _version: filteredUserFriendRequests[0]._version,
              },
            },
          });
          setDeletedRequest(JSON.stringify(deletedFriendRequest));
        } catch (error) {
          console.error('Error deleting friend request:', error);
        }
      }
    } catch (err: any) {
      console.error('Error deleting friendRequest:', err);
      setError(err);
    }
  };

  return { deletedRequest, error, handleDeleteIncomingFriendRequest };
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

        const jsonFriendRequests = await fetchAllFriendRequests();

        const filteredFriendRequests = jsonFriendRequests.items
          .filter((item: any) => {
            return item.sender.id === parsedUserData.id && !item._deleted;
          })
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

export const useDeleteOutgoingFriendRequest = () => {
  const [deletedRequest, setDeletedRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleDeleteOutgoingFriendRequest = async (friendId: string) => {
    try {
      const userData = localStorage.getItem('currentUser')!;
      const parsedUserData = JSON.parse(userData);

      const jsonFriendRequests = await fetchAllFriendRequests();

      const filteredFriendUserRequests = jsonFriendRequests.items.filter((item: any) => {
        return (
          item.receiver.id === friendId && item.sender.id === parsedUserData.id && !item._deleted
        );
      });

      if (filteredFriendUserRequests.length > 0) {
        try {
          const deletedFriendRequest = await client.graphql({
            query: deleteFriendRequest,
            variables: {
              input: {
                id: filteredFriendUserRequests[0].id,
                _version: filteredFriendUserRequests[0]._version,
              },
            },
          });
          setDeletedRequest(JSON.stringify(deletedFriendRequest));
        } catch (error) {
          console.error('Error deleting friend request:', error);
        }
      }
    } catch (err: any) {
      console.error('Error deleting friendRequest:', err);
      setError(err);
    }
  };

  return { deletedRequest, error, handleDeleteOutgoingFriendRequest };
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

const addFriend = async (userId: string, newFriendId: string) => {
  try {
    const userResponse = await client.graphql({
      query: getUser,
      variables: { id: userId },
    });
    const user = userResponse.data.getUser;

    if (!user) {
      throw new Error('User not found');
    }

    const updateResponse = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userId,
          friends: [newFriendId],
        },
      },
    });
    return updateResponse;
  } catch (error) {
    console.error('Error in addFriend:', error);
  }
};

export const useFetchFriends = () => {
  const [friends, setFriend] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFriends = /* GraphQL */ `
    query GetFriends($id: ID!) {
      getUser(id: $id) {
        friends
      }
    }
  `;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('currentUser');
        const parsedUserData = JSON.parse(userData!);

        const friendsIds = await client.graphql({
          query: getFriends,
          variables: { id: parsedUserData.id },
        });
        const parsedFriendIds = JSON.parse(JSON.stringify(friendsIds));

        const friendsInfo = await fetchFriendsInfo(parsedFriendIds.data.getUser.friends);

        setFriend(friendsInfo);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { friends, loading, error };
};

const fetchFriendInfo = async (friendId: string) => {
  const response = await client.graphql({
    query: getUser,
    variables: { id: friendId },
  });

  return response.data.getUser;
};

const fetchFriendsInfo = async (friendsIds: string[]) => {
  try {
    const friendsInfo = await Promise.all(friendsIds.map(fetchFriendInfo));

    return friendsInfo; // This is an array of friends' information
  } catch (error) {
    console.error("Error fetching friends' information:", error);
  }
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

  const getFriends = /* GraphQL */ `
    query GetFriends($id: ID!) {
      getUser(id: $id) {
        friends
      }
    }
  `;

  useEffect(() => {
    // Ensure members is defined and not empty before proceeding
    if (!members || members.length === 0) return;

    const fetchFriends = async () => {
      try {
        const userData = localStorage.getItem('currentUser')!;
        const parsedUserData = JSON.parse(userData);

        const membersWithoutUser = members.filter(
          (member: any) => member.user.id != parsedUserData.id
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
