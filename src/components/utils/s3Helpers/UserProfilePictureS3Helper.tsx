import { uploadData } from '@aws-amplify/storage';

import ConfigureAmplifyClientSide from '@/src/components/ConfigureAmplify';
import { getUserAPI, updateUserProfilePicAPI } from '@/src/api/services/user';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../utilFunctions';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, userId: string) {
  const timestamp = Date.now();
  return `UserProfilePictures/${userId}-${timestamp}-${fileName}`;
}

export async function retrieveImage(userId: string) {
  const user = await getUserAPI(userId);
  if (user) {
    if (user.profilePic) {
      if (user.profilePic.includes(userId)) {
        let imageKey = user.profilePic;
        if (
          imageKey.includes(
            'https://neighbourhooda920d24246fa4325ad39f863f5b37e50195636-dev.s3.ca-central-1.amazonaws.com'
          )
        ) {
          const parsedUrl = new URL(imageKey);
          imageKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));
        }
        return retrieveImageURLFromS3(imageKey);
      }
      return user.profilePic;
    }
    return '';
  }
  throw new Error('User does not exist when retrieving profile pic');
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

      await updateUserProfilePicAPI(user.id, uploadResult.key, user._version);

      return uploadResult.key;
    }
    throw new Error('userId given to store user profile picture is invalid');
  } catch (error) {
    throw new Error(`Error occured when uploading user profile pic to S3: ${error}`);
  }
}

export async function clearImage(userId: string) {
  try {
    const user = await getUserAPI(userId);
    if (user) {
      if (user.profilePic?.includes(`UserProfilePictures/${userId}`)) {
        const url = user.profilePic;
        const parsedUrl = new URL(url);
        const objectKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));

        await deleteImageFromS3(objectKey);
      }
      await updateUserProfilePicAPI(user.id, '', user._version);
    }
    throw new Error('userId given to clear profile picture does not exist.');
  } catch (error) {
    throw new Error('Error retrieving/updating user when clearing user profile picture');
  }
}
