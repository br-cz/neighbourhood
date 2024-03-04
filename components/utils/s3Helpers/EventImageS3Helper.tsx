import { uploadData, getUrl } from '@aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getEventAPI, updateEventImageAPI } from '@/src/api/services/event';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, eventId: string) {
    const timestamp = Date.now();
    return `EventImages/${eventId}-${timestamp}-${fileName}`;
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

      // Since only one image is allowed, directly update the event's image field
      await updateEventImageAPI(event.id, uploadResult.key, event._version);
      return uploadResult.key;
    }
    throw new Error('eventId given to store event image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading event image to S3: ${error}`);
    }
}

export async function retrieveImage(eventId: string) {
  const event = await getEventAPI(eventId);
  if (event && event.images && event.images.length > 0 && event.images[0]) {
    try {
      const imageKey = event.images[0];
      const result = await getUrl({
        key: imageKey,
        options: {
          validateObjectExistence: true,
        },
      });
      return result.url.toString(); // Returns the single image URL
    } catch (error) {
      throw new Error(`Error retrieving event image from S3: ${error}`);
    }
  }
  throw new Error('No image exists for this event or the event does not exist');
}

export async function clearImage(eventId: string) {
    try {
      const event = await getEventAPI(eventId);
      if (event) {
        await updateEventImageAPI(event.id, '', event._version);
      } else {
        throw new Error('eventId given to clear image does not exist.');
      }
    } catch (error) {
      throw new Error(`Error retrieving/updating event when clearing event image: ${error}`);
    }
}
