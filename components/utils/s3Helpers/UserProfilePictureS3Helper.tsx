import { generateClient } from '@aws-amplify/api';
import { uploadData, getUrl } from '@aws-amplify/storage';
import { updateUser } from '@/src/graphql/mutations';

import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getUserAPI, updateUserProfilePicAPI } from '@/src/api/services/user';

ConfigureAmplifyClientSide();
const client = generateClient();

function generateKey(fileName: string, userId: string) {
    const timestamp = Date.now();
    return `UserProfilePictures/${userId}-${timestamp}-${fileName}`;
}

export async function storeImage(file: File, userId: string) {
  if (!file || !userId) {
    throw new Error('Invalid file or userId');
  }

  const imageKey = generateKey(file.name, userId);

  try {
    const user = await getUserAPI(userId);
    if (user) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      console.log(uploadResult.key);

      await updateUserProfilePicAPI(userId, uploadResult.key, user._version);

      return uploadResult.key;
    }
    throw new Error('userId given to store user profile picture is invalid');
  } catch (error) {
      throw new Error(`Error occured when uploading user profile pic to S3: ${error}`);
    }
}

export async function retrieveImage(userId: string) {
  const user = await getUserAPI(userId);
  if (user) {
  const imageKey = user.profilePic;
  console.log(`imageKey: ${imageKey}`);
  console.log(`contains id: ${imageKey?.includes(userId)}`);
  if (imageKey) {
    if (imageKey)
    try {
       const result = await getUrl({
        key: imageKey,
        options: {
          validateObjectExistence: true,
        },
      });
      return result.url.toString();
    } catch (error) {
      throw new Error(`Error retrieving user profile picture from S3: ${error}`);
    }
  }
  throw new Error('No profile picture url exists in user table');
}
  throw new Error('userId given does not exist when retrieving user profile picture');
}

export async function clearImage(userId: string) {
  try {
    const user = await getUserAPI(userId);
    if (user) {
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            profilePic: '',
          },
        },
      });
    }
    throw new Error('userId given to clear profile picture does not exist.');
  } catch (error) {
    throw new Error('Error retrieving/updating user when clearing user profile picture');
  }
}
