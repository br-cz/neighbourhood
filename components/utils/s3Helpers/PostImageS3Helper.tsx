import { uploadData, getUrl } from '@aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getPostAPI, updatePostImageAPI } from '@/src/api/services/post';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, postId: string) {
    const timestamp = Date.now();
    return `PostImages/${postId}-${timestamp}-${fileName}`;
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

      // Since only one image is allowed, directly update the post's image field
      await updatePostImageAPI(post.id, uploadResult.key);
      return uploadResult.key;
    }
    throw new Error('postId given to store post image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading post image to S3: ${error}`);
    }
}

export async function retrieveImage(postId: string) {
  const post = await getPostAPI(postId);
  if (post && post.images && post.images.length > 0 && post.images[0]) {
    try {
      const imageKey = post.images[0];
      const result = await getUrl({
        key: imageKey,
        options: {
          validateObjectExistence: true,
        },
      });
      return result.url.toString(); // Returns the single image URL
    } catch (error) {
      throw new Error(`Error retrieving post image from S3: ${error}`);
    }
  }
  throw new Error('No image exists for this post or the post does not exist');
}

export async function clearImage(postId: string) {
    try {
      const post = await getPostAPI(postId);
      if (post) {
        await updatePostImageAPI(post.id, '');
      } else {
        throw new Error('postId given to clear image does not exist.');
      }
    } catch (error) {
      throw new Error(`Error retrieving/updating post when clearing post image: ${error}`);
    }
}
