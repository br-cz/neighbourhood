import { generateClient } from '@aws-amplify/api';
import { getCommunity, listCommunities } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getCommunityAPI = async (communityId: string) => {
    try {
      const response = await client.graphql({
        query: getCommunity,
        variables: { id: communityId },
      });
      return response.data.getCommunity;
    } catch (error: any) {
      throw new HttpError(error.message, error.statusCode || 500);
    }
};

export const getCurrentCommunityAPI = async () => {
    try {
      const currentCommunityID = JSON.parse(localStorage.getItem('currentCommunityID')!);
      if (!currentCommunityID) {
        throw new Error('No current community ID found');
      }
      return await getCommunityAPI(currentCommunityID);
    } catch (error: any) {
      throw new HttpError(error.message, error.statusCode || 500);
    }
};

export const getAllUserCommunities = async (communityId: string) => {
  const ListUserCommunities = /* GraphQL */ `
    query ListUserCommunities {
      listUserCommunities {
        nextToken
        startedAt
        items {
          id
          user {
            id
            createdAt
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
  try {
    const fetchedMembers = await client.graphql({
      query: ListUserCommunities,
      variables: { id: communityId },
    });
    return fetchedMembers;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

export const getAllCommunities = async () => {
  try {
    const response = await client.graphql({ query: listCommunities });
    return response;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};
