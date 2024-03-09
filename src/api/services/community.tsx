import { generateClient } from '@aws-amplify/api';
import { getCommunity, listCommunities } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';
import { switchCommunity } from '@/src/graphql/mutations';
import { updateCommunity } from '@/src/graphql/mutations';

const client = generateClient();
export const getCurrentUserID = () => JSON.parse(localStorage.getItem('currentUserID')!);
export const getCurrentCommunityID = () => JSON.parse(localStorage.getItem('currentCommunityID')!);

export const switchCommunityAPI = async (userId: string, communityId: string) => {
  try {
    const response = await client.graphql({
      query: switchCommunity,
      variables: { userId: userId, communityId: communityId },
    });
    return response.data.switchCommunity;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

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
    const currentCommunityID = getCurrentCommunityID();
    if (!currentCommunityID) {
      throw new Error('No current community ID found');
    }
    return await getCommunityAPI(currentCommunityID);
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

export const getAllUserCommunitiesAPI = async (communityId: string) => {
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
          _deleted
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

export const getAllCommunitiesAPI = async () => {
  try {
    const response = await client.graphql({ query: listCommunities });
    return response;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

export const getAllCommunityDetails = async () => {
  const getAllCommunityDetails = /* GraphQL */ `
    query getAllCommunityDetails {
      listCommunities {
        items {
          id
          name
          image
          location
          posts {
            items {
              id
            }
          }
          members {
            items {
              _deleted
              id
              userId
              user {
                id
                friends
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await client.graphql({ query: getAllCommunityDetails });
    return response;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

export const updateCommunityImageAPI = async (
  communityId: string,
  image: string,
  _version: number
) => {
  try {
    const updateCommunityResponse = await client.graphql({
      query: updateCommunity,
      variables: {
        input: {
          id: communityId,
          image,
          _version,
        },
      },
    });
    return updateCommunityResponse;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};
