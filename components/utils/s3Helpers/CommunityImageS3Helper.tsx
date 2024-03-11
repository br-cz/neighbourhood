import { uploadData } from '@aws-amplify/storage';

import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getCommunityAPI, updateCommunityImageAPI } from '@/src/api/services/community';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../utilFunctions';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, communityId: string) {
    const timestamp = Date.now();
    return `CommunityImages/${communityId}-${timestamp}-${fileName}`;
}

export async function retrieveImage(communityId: string) {
  const community = await getCommunityAPI(communityId);
  if (community) {
    if (community.image) {
      if (community.image.includes(communityId)) {
        return retrieveImageURLFromS3(community.image);
      }
      return community.image;
    }
    throw new Error('There is no image available for community');
  }
  throw new Error('Community does not exist when retrieving image');
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

      await updateCommunityImageAPI(community.id, uploadResult.key, community._version);

      return uploadResult.key;
    }
    throw new Error('communityId given to store community image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading community image to S3: ${error}`);
    }
}

export async function clearImage(communityId: string) {
  try {
    const community = await getCommunityAPI(communityId);
    if (community) {
      if (community.image?.includes(`CommunityImages/${communityId}`)) {
        const url = community.image;
        const parsedUrl = new URL(url);
        const objectKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));

        await deleteImageFromS3(objectKey);
      }
      await updateCommunityImageAPI(community.id, '', community._version);
    } else {
      throw new Error('communityId given to clear image does not exist.');
    }
  } catch (error) {
    throw new Error('Error retrieving/updating community when clearing community image');
  }
}
