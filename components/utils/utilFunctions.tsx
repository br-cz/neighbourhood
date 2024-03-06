import { getUrl, remove } from '@aws-amplify/storage';

export const isValidUrl = (urlString: string) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

export async function retrieveImageURLFromS3(imageKey: string) {
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

export async function deleteImageFromS3(imageKey: string) {
    try {
        await remove({ key: imageKey });
    } catch (error: any) {
        throw new Error(`Error deleting image from S3: ${error}`);
    }
}

export function getInitials(firstName: string, lastName: string) {
    const firstInitial = firstName && firstName[0] ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName && lastName[0] ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
}
