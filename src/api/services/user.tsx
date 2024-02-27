import { generateClient } from '@aws-amplify/api';
import { getUser } from '@/src/graphql/queries';
import { updateUser } from '@/src/graphql/mutations';
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
