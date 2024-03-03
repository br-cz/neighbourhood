import { uploadData, getUrl } from 'aws-amplify/storage';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';
import { getItemForSaleAPI, updateItemForSaleImageAPI } from '@/src/api/services/itemForSale';

ConfigureAmplifyClientSide();

function generateKey(fileName: string, itemId: string) {
    const timestamp = Date.now();
    return `ItemForSaleImages/${itemId}-${timestamp}-${fileName}`;
}

export async function storeImage(file: File, itemId: string) {
  if (!file || !itemId) {
    throw new Error('Invalid file or itemId');
  }

  const imageKey = generateKey(file.name, itemId);

  try {
    const itemForSale = await getItemForSaleAPI(itemId);
    if (itemForSale) {
      const uploadResult = await uploadData({
        key: imageKey,
        data: file,
      }).result;

      // Since only one image is allowed, directly update the item's image field
      await updateItemForSaleImageAPI(itemForSale.id, uploadResult.key);
      return uploadResult.key;
    }
    throw new Error('itemId given to store item image is invalid');
  } catch (error) {
      throw new Error(`Error occurred when uploading item image to S3: ${error}`);
    }
}

export async function retrieveImage(itemId: string) {
  const itemForSale = await getItemForSaleAPI(itemId);
  if (itemForSale && itemForSale.images && itemForSale.images.length > 0 && itemForSale.images[0]) {
    try {
      const imageKey = itemForSale.images[0];
      const result = await getUrl({
        key: imageKey,
        options: {
          validateObjectExistence: true,
        },
      });
      return result.url.toString(); // Returns the single image URL
    } catch (error) {
      throw new Error(`Error retrieving item image from S3: ${error}`);
    }
  }
  throw new Error('No image exists for this item or the item does not exist');
}

export async function clearImage(itemId: string) {
    try {
        const itemForSale = await getItemForSaleAPI(itemId);
        if (itemForSale) {
            await updateItemForSaleImageAPI(itemForSale.id, '');
        } else {
            throw new Error('itemId given to clear image does not exist.');
        }
    } catch (error) {
        throw new Error(`Error retrieving/updating item for sale when clearing item image: ${error}`);
    }
}
