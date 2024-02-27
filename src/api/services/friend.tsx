import { generateClient } from '@aws-amplify/api';
import * as APITypes from '@/src/API';
import {
  createFriendRequest,
  deleteFriendRequest,
  removeFriend,
  updateUser,
} from '@/src/graphql/mutations';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const fetchAllFriendRequestsAPI = async () => {
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
      const friendRequestJSON = JSON.parse(JSON.stringify(fetchedFriendRequest));
      return friendRequestJSON.data.listFriendRequests;
    } catch (error: any) {
        throw new HttpError(`Error listing all friend requests: ${error.message}`, error.statusCode || 500);
    }
  };

  export const createFriendRequestAPI = async (friendRequestData: APITypes.CreateFriendRequestInput) => {
    try {
      return await client.graphql({
        query: createFriendRequest,
        variables: { input: friendRequestData },
      });
    } catch (error: any) {
        throw new HttpError(`Error creating friend request: ${error.message}`, error.statusCode || 500);
    }
  };

  export const deleteFriendRequestAPI = async (requestId: string, version: any) => {
    try {
      return await client.graphql({
        query: deleteFriendRequest,
        variables: {
          input: {
            id: requestId,
            _version: version,
          },
        },
      });
    } catch (error: any) {
        throw new HttpError(`Error deleting friend request: ${error.message}`, error.statusCode || 500);
    }
  };

  export const addFriendAPI = async (userId: string, newFriendId: string) => {
    try {
      return await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            friends: [newFriendId],
          },
        },
      });
    } catch (error: any) {
        throw new HttpError(`Error adding friend: ${error.message}`, error.statusCode || 500);
    }
  };

  export const removeFriendAPI = async (userId: string, friendId: string) => {
    try {
      const friend = await client.graphql({
        query: removeFriend,
        variables: {
          userId,
          friendId,
        },
      });
      return friend;
    } catch (error: any) {
        throw new HttpError(`Error removing friend: ${error.message}`, error.statusCode || 500);
    }
  };

  export const getFriendsAPI = async (userId: string) => {
    const getFriends = /* GraphQL */ `
    query GetFriends($id: ID!) {
      getUser(id: $id) {
        friends
      }
    }
  `;

    try {
        const friends = await client.graphql({
            query: getFriends,
            variables: { id: userId },
        });
        const friendsJSON = JSON.parse(JSON.stringify(friends));
        return friendsJSON.data.getUser.friends;
    } catch (error: any) {
        throw new HttpError(`Error getting friends: ${error.message}`, error.statusCode || 500);
    }
  };
