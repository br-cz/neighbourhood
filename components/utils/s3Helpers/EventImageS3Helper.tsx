import { uploadData } from '@aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getEventAPI, updateEventImageAPI } from '@/src/api/services/event';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../utilFunctions';

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

      const imageUrl = await retrieveImageURLFromS3(uploadResult.key);

      await updateEventImageAPI(event.id, imageUrl, event._version);
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
