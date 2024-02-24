import { generateClient } from 'aws-amplify/api';
import { updateUser } from '@/src/graphql/mutations';

const client = generateClient();

export const updateUserEmail = async (userId: string, newEmail: string, _version: number) => {
  const input = {
    id: userId,
    email: newEmail,
    _version: _version,
  };

  try {
    const updatedUser = await client.graphql({
      query: updateUser,
      variables: { input },
    });
    const jsonUpdatedUser = JSON.parse(JSON.stringify(updatedUser));
    console.log('User updated successfully:', jsonUpdatedUser.data.updateUser);
    return jsonUpdatedUser.data.updateUser;
  } catch (error: any) {
    console.error('Error updating user email:', error);
    return error;
  }
};
