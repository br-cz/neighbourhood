import { uploadData } from '@aws-amplify/storage'; // Assuming getUrl is not needed due to retrieveImageURLFromS3 utility
import ConfigureAmplifyClientSide from '@/src/components/ConfigureAmplify';
import { getPostAPI, updatePostImageAPI } from '@/src/api/services/post';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../s3Utils'; // Assuming these utility functions are similar to the event helper

ConfigureAmplifyClientSide();

function generateKey(fileName: string, postId: string) {
  const timestamp = Date.now();
  return `PostImages/${postId}-${timestamp}-${fileName}`;
}

export async function retrieveImage(postId: string) {
  const post = await getPostAPI(postId);
  if (post) {
    if (post.images && post.images[0]) {
      if (post.images[0]?.includes(postId)) {
        return retrieveImageURLFromS3(post.images[0]);
      }
      return post.images[0];
    }
    return '';
  }
  throw new Error('Post does not exist when retrieving image');
}

export async function storeImage(file: File, postId: string) {
  if (!file || !postId) {
    throw new Error('Invalid file or postId');
  }

  const imageKey = generateKey(file.name, postId);

  try {
    const post = await getPostAPI(postId);
    if (post) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      await updatePostImageAPI(post.id, uploadResult.key, post._version);

      return uploadResult.key;
    }
    throw new Error('postId given to store post image is invalid');
  } catch (error) {
    throw new Error(`Error occurred when uploading post image to S3: ${error}`);
  }
}

export async function clearImage(postId: string) {
  try {
    const post = await getPostAPI(postId);
    if (post) {
      if (post.images && post.images[0]?.includes(`PostImages/${postId}`)) {
        // Check if the image belongs to the post
        const url = post.images[0];
        const parsedUrl = new URL(url);
        const objectKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));

        await deleteImageFromS3(objectKey); // Delete the image from S3
      }
      await updatePostImageAPI(post.id, '', post._version); // Clear the image field in the post record
    } else {
      throw new Error('postId given to clear image does not exist.');
    }
  } catch (error) {
    throw new Error(`Error retrieving/updating post when clearing post image: ${error}`);
  }
}
