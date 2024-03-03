import { uploadData, getUrl } from 'aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getCommunityAPI, updateCommunityAPI } from '@/src/api/services/community';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, communityId: string) {
    const timestamp = Date.now();
    return `CommunityImages/${communityId}-${timestamp}-${fileName}`;
}

export async function storeImage(file: File, communityId: string) {
  if (!file || !communityId) {
    throw new Error('Invalid file or communityId');
  }

  const imageKey = generateKey(file.name, communityId);

  try {
    const community = await getCommunityAPI(communityId);
    if (community) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      await updateCommunityAPI({ id: community.id, image: uploadResult.key });
      return uploadResult.key;
    }
    throw new Error('communityId given to store community image is invalid');
  } catch (error) {
      throw new Error(`Error occured when uploading community image to S3: ${error}`);
    }
}

export async function retrieveImage(communityId: string) {
  const community = await getCommunityAPI(communityId);
  if (community) {
  const imageKey = community.image;
  if (imageKey) {
    try {
       const result = await getUrl({
        key: imageKey,
        options: {
          validateObjectExistence: true,
        },
      });
      return result.url.toString();
    } catch (error) {
      throw new Error(`Error retrieving community age from S3: ${error}`);
    }
  }
  throw new Error('No profile picture url exists in Community table');
}
  throw new Error('communityId given does not exist when retrieving community image');
}

export async function clearImage(communityId: string) {
    try {
      const community = await getCommunityAPI(communityId);
      if (community) {
        await updateCommunityAPI({ id: community.id, image: '' });
      }
      throw new Error('communityId given to clear image does not exist.');
    } catch (error) {
      throw new Error('Error retrieving/updating community when clearing community image');
    }
}
