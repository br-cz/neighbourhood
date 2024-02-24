import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCommunity, getUser } from '@/src/graphql/queries';
import * as APITypes from '../API';
import { createFriendRequest, deleteFriendRequest, updateUser } from '../graphql/mutations';
import { useFetchMembers } from '@/src/api/memberQueries';

const client = generateClient();

export const useCreateFriendRequest = () => {
  const [friendRequest, sentFriendRequest] = useState<string>('');
  const [error, setError] = useState('');

  const handleCreateFriendRequest = async (
    friendRequestData: APITypes.CreateFriendRequestInput
  ) => {
    try {
      const userData = localStorage.getItem('userData')!;
      const parsedUserData: User = JSON.parse(userData);

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

export const useFetchIncomingFriendRequests = () => {
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Add a state to trigger re-fetch

  const refetch = () => setReload(!reload); // Function to toggle the reload state

  const ListFriendRequests = /* GraphQL */ `
    query ListFriendRequests {
      listFriendRequests {
        items {
          _deleted
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

  useEffect(() => {
    const fetchedFriendRequests = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const fetchedFriendRequest = await client.graphql({
          query: ListFriendRequests,
        });

        const jsonFriendRequests = JSON.parse(JSON.stringify(fetchedFriendRequest));
        const filteredFriendRequests = jsonFriendRequests.data.listFriendRequests.items
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

export const useFetchOutgoingFriendRequests = () => {
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Add a state to trigger re-fetch

  const refetch = () => setReload(!reload); // Function to toggle the reload state

  const ListFriendRequests = /* GraphQL */ `
    query ListFriendRequests {
      listFriendRequests {
        items {
          _deleted
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

  useEffect(() => {
    const fetchedFriendRequests = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const fetchedFriendRequest = await client.graphql({
          query: ListFriendRequests,
        });

        const jsonFriendRequests = JSON.parse(JSON.stringify(fetchedFriendRequest));

        const filteredFriendRequests = jsonFriendRequests.data.listFriendRequests.items
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

export const useCreateFriend = () => {
  const [friend, setFriend] = useState<string>('');
  const [error, setError] = useState('');

  const handleCreateFriend = async (newFriendId: string) => {
    try {
      const localUserData = localStorage.getItem('userData')!;
      const parsedLocalUserData = JSON.parse(localUserData);

      const user = await addFriend(parsedLocalUserData.id, newFriendId);
      await addFriend(newFriendId, parsedLocalUserData.id);

      const ListFriendRequests = /* GraphQL */ `
        query ListFriendRequests {
          listFriendRequests {
            items {
              id
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

      const fetchedFriendRequest = await client.graphql({
        query: ListFriendRequests,
      });

      const jsonFriendRequests = JSON.parse(JSON.stringify(fetchedFriendRequest));
      const filteredUserFriendRequests = jsonFriendRequests.data.listFriendRequests.items.filter(
        (item: any) => {
          return (
            item.receiver.id === parsedLocalUserData.id &&
            item.sender.id === newFriendId &&
            !item._deleted
          );
        }
      );

      const filteredFriendUserRequests = jsonFriendRequests.data.listFriendRequests.items.filter(
        (item: any) => {
          return (
            item.receiver.id === newFriendId &&
            item.sender.id === parsedLocalUserData.id &&
            !item._deleted
          );
        }
      );

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
        } catch (error) {
          console.error('Error deleting friend request:', error);
        }
      }
      if (filteredFriendUserRequests.length != 0) {
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
        } catch (error) {
          console.error('Error deleting friend request:', error);
        }
      }

      setFriend(JSON.stringify(user));
    } catch (err: any) {
      console.error('Error creating friend:', err);
      setError(err);
    }
  };

  return { friend, error, handleCreateFriend };
};

const addFriend = async (userId: string, newFriendId: string) => {
  const userResponse = await client.graphql({
    query: getUser,
    variables: { id: userId },
  });
  const user = userResponse.data.getUser!;

  // Initialize friends list if it doesn't exist, otherwise, create a copy!
  const currentFriendsList = user.friends ? [...user.friends] : [];

  // Check for duplicate friend ID
  if (!currentFriendsList.includes(newFriendId)) {
    currentFriendsList.push(newFriendId);

    const input = {
      id: userId,
      friends: currentFriendsList,
    };

    const updateResponse = await client.graphql({
      query: updateUser,
      variables: { input },
    });

    return updateResponse;
  } else {
    console.log('Friend ID already in friends list.');
    return user;
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
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const friendsIds = await client.graphql({
          query: getFriends,
          variables: { id: parsedUserData.id },
        });
        const parsedFriendIds = JSON.parse(JSON.stringify(friendsIds));

        const friendsInfo = await fetchFriendsInfo(parsedFriendIds.data.getUser.friends); // Assuming parsedUserData.friends is your array of friend IDs

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

export const useFetchNonFriends = () => {
  const [nonFriends, setNonFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { members } = useFetchMembers();
  // console.log('mebers');
  // console.log(members);
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
        const userData = localStorage.getItem('userData')!;
        const parsedUserData = JSON.parse(userData);

        const friendsIds = await client.graphql({
          query: getFriends,
          variables: { id: parsedUserData.id },
        });

        const parsedFriendIds = JSON.parse(JSON.stringify(friendsIds));

        const friendIdsLookup = new Map();
        parsedFriendIds.data.getUser.friends.forEach((friendId: string) => {
          friendIdsLookup.set(friendId, true); // Set each friend ID as a key in the map
        });

        console.log('friedn id lookup');
        console.log(friendIdsLookup);

        // console.log(members[0].user.id);
        const nonFriendMembers = members
          .filter((member: any) => !friendIdsLookup.has(member.user.id))
          .map((member: any) => member.user);

        console.log('non friend memberse');
        console.log(nonFriendMembers);

        // const mapped = nonFriendMembers.map((member: any) => member.user);
        // console.log(mapped);
        setNonFriends(nonFriendMembers);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { nonFriends, loading, error };
};
