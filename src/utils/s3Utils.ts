import { getUrl, remove } from '@aws-amplify/storage';
import { redis } from '../components/ConfigureRedis';

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export async function retrieveImageURLFromS3(imageKey: string) {
  const cachedValue = await redis.get<string>(imageKey);
  if (cachedValue) {
    return cachedValue;
  }
  try {
    const result = await getUrl({
      key: imageKey,
      options: {
        validateObjectExistence: true,
        expiresIn: 3600,
      },
    });
    if (result.url.toString()) {
      await redis.set(imageKey, result.url.toString());
      await redis.expire(imageKey, 3000);
    }
    return result.url.toString();
  } catch (error) {
    throw new Error(`Error retrieving user profile picture from S3: ${error}`);
  }
}

export async function deleteImageFromS3(imageKey: string) {
  try {
    await remove({ key: imageKey });
  } catch (error: any) {
    throw new Error(`Error deleting image from S3: ${error}`);
  }
}
