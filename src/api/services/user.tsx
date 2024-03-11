import { generateClient } from '@aws-amplify/api';
import { getUser } from '@/src/graphql/queries';
import { createUser, updateUser, createUserCommunity } from '@/src/graphql/mutations';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getUserAPI = async (userId: string) => {
    try {
        const response = await client.graphql({
        query: getUser,
        variables: { id: userId },
        });
        return response.data.getUser;
    } catch (error: any) {
        throw new HttpError(`Error retrieving user: ${error.message}`, error.statusCode || 500);
    }
};

export const getCurrentUserAPI = async () => {
    try {
        const currentUserID = JSON.parse(localStorage.getItem('currentUserID')!);
        if (!currentUserID) {
        throw new Error('No current user ID found');
        }
        return await getUserAPI(currentUserID);
    } catch (error: any) {
        throw new HttpError(`Error retrieving current user: ${error.message}`, error.statusCode || 500);
    }
};

export const updateUserEmailAPI = async (userId: string, newEmail: string, _version: number) => {
const input = { id: userId, email: newEmail, _version };
    try {
        const updatedUser = await client.graphql({
        query: updateUser,
        variables: { input },
        });
        console.log('User updated successfully:', updatedUser.data.updateUser);
        return updatedUser.data.updateUser;
    } catch (error: any) {
        throw new HttpError(`Error updating user email: ${error.message}`, error.statusCode || 500);
    }
};

export const updateUserProfilePicAPI = async (userId: string, image: string, _version: number) => {
        try {
            const updatedUser = await client.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: userId,
                        profilePic: image,
                        _version,
                    },
                },
            });
            console.log('User updated successfully:', updatedUser.data.updateUser);
            return updatedUser.data.updateUser;
        } catch (error: any) {
            throw new HttpError(`Error updating user profile picture: ${error.message}`, error.statusCode || 500);
        }
    };

export const createUserAPI = async (user: any) => {
    try {
        const createUserResponse = await client.graphql({
          query: createUser,
          variables: {
            input: {
              id: user.id,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              selectedCommunity: user.selectedCommunity,
              postalCode: user.postalCode,
              address: user.address,
              profilePic: user.profilePic,
              bio: user.bio,
              kids: user.kids,
              pets: user.pets,
              contact: user.contact,
              birthday: user.birthday,
              pronouns: user.pronouns,
            },
          },
        });
        return createUserResponse.data.createUser;
    } catch (error: any) {
        throw new HttpError(`Error creating new user: ${error.message}`, error.statusCode || 500);
    }
};

export const createUserCommunityAPI = async (userId: string, communityId: string) => {
    try {
        const createUserCommunityResponse = await client.graphql({
            query: createUserCommunity,
            variables: {
                input: {
                    communityId,
                    userId,
                },
            },
        });
        return createUserCommunityResponse.data.createUserCommunity;
    } catch (error: any) {
        throw new HttpError(`Error creating user community connection: ${error.message}`, error.statusCode || 500);
    }
};

export const updateUserAPI = async (user: any) => {
  try {
    const updateUserResponse = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          selectedCommunity: user.selectedCommunity,
          postalCode: user.postalCode,
          address: user.address,
          profilePic: user.profilePic,
          bio: user.bio,
          kids: user.kids,
          pets: user.pets,
          contact: user.contact,
          birthday: user.birthday,
          pronouns: user.pronouns,
          _version: user._version,
        },
      },
    });
    return updateUserResponse.data.updateUser;
  } catch (error: any) {
    throw new HttpError(`Error updating user: ${error.message}`, error.statusCode || 500);
  }
};
