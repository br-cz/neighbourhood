import { uploadData } from '@aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getListingAPI, updateItemForSaleImageAPI } from '@/src/api/services/marketplace';
import { deleteImageFromS3, retrieveImageURLFromS3 } from '../utilFunctions';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, itemId: string) {
    const timestamp = Date.now();
    return `ItemForSaleImages/${itemId}-${timestamp}-${fileName}`;
}

export async function retrieveImage(itemId: string) {
  const listing = await getListingAPI(itemId);
  if (listing) {
    if (listing.images && listing.images[0]) {
      if (listing.images[0]?.includes(itemId)) {
        return retrieveImageURLFromS3(listing.images[0]);
      }
      return listing.images[0];
    }
    return retrieveImageURLFromS3('ItemForSaleImages/placeholder-img.jpg');
  }
  throw new Error('Listing does not exist when retrieving image');
}

export async function storeImage(file: File, itemId: string) {
  if (!file || !itemId) {
    throw new Error('Invalid file or itemId');
  }

  const imageKey = generateKey(file.name, itemId);

  try {
    const itemForSale = await getListingAPI(itemId);
    if (itemForSale) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      await updateItemForSaleImageAPI(itemForSale.id, uploadResult.key, itemForSale._version);

      return uploadResult.key;
    }
    throw new Error('itemId given to store item image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading item image to S3: ${error}`);
    }
}

export async function clearImage(itemId: string) {
    try {
      const itemForSale = await getListingAPI(itemId);
      if (itemForSale) {
        if (itemForSale.images && itemForSale.images[0]?.includes(`ItemForSaleImages/${itemId}`)) {
          const url = itemForSale.images[0];
          const parsedUrl = new URL(url);
          const objectKey = decodeURIComponent(parsedUrl.pathname.replace(/\+/g, ' ').substring(1));

          await deleteImageFromS3(objectKey);
        }
        await updateItemForSaleImageAPI(itemForSale.id, '', itemForSale._version);
      } else {
        throw new Error('itemId given to clear image does not exist.');
      }
    } catch (error) {
      throw new Error(`Error retrieving/updating item for sale when clearing item image: ${error}`);
    }
}
