import { uploadData } from '@aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getEventAPI, updateEventImageAPI } from '@/src/api/services/event';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../utilFunctions';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, eventId: string) {
    const timestamp = Date.now();
    return `EventImages/${eventId}-${timestamp}-${fileName}`;
}

export async function retrieveImage(eventId: string) {
  const event = await getEventAPI(eventId);
  if (event) {
    if (event.images && event.images[0]) {
      if (event.images[0]?.includes(eventId)) {
        return retrieveImageURLFromS3(event.images[0]);
      }
      return event.images[0];
    }
    return retrieveImageURLFromS3('EventImages/placeholder-img.jpg');
  }
  throw new Error('Event does not exist when retrieving image');
}

export async function storeImage(file: File, eventId: string) {
  if (!file || !eventId) {
    throw new Error('Invalid file or eventId');
  }

  const imageKey = generateKey(file.name, eventId);

  try {
    const event = await getEventAPI(eventId);
    if (event) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      await updateEventImageAPI(event.id, uploadResult.key, event._version);
      return uploadResult.key;
    }
    throw new Error('eventId given to store event image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading event image to S3: ${error}`);
    }
}

export async function clearImage(eventId: string) {
    try {
      const event = await getEventAPI(eventId);
      if (event) {
        if (event.images && event.images[0]?.includes(`EventImages/${eventId}`)) {
          const url = event.images[0];
          const parsedUrl = new URL(url);
          const objectKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));
          await deleteImageFromS3(objectKey);
        }
        await updateEventImageAPI(event.id, '', event._version);
      } else {
        throw new Error('eventId given to clear image does not exist.');
      }
    } catch (error) {
      throw new Error(`Error retrieving/updating event when clearing event image: ${error}`);
    }
}
