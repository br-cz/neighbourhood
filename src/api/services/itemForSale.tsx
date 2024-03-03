import { generateClient } from '@aws-amplify/api';
import { createItemForSale, updateItemForSale } from '@/src/graphql/mutations';
import { getItemForSale } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getItemForSaleAPI = async (itemId: string) => {
    try {
        const response = await client.graphql({
            query: getItemForSale,
            variables: { id: itemId },
        });
        return response.data.getItemForSale;
    } catch (error: any) {
        throw new HttpError(`Error retrieving item for sale: ${error.message}`, error.statusCode || 500);
    }
};

export const createItemForSaleAPI = async (userId: string, communityId: string, itemData: any) => {
    try {
        const newItemData = {
            ...itemData,
            userItemsForSaleId: userId,
            communityItemsForSaleId: communityId,
        };
        const response = await client.graphql({
            query: createItemForSale,
            variables: { input: newItemData },
        });
        return response.data.createItemForSale;
    } catch (error: any) {
        throw new HttpError(`Error creating item for sale: ${error.message}`, error.statusCode || 500);
    }
};

export const updateItemForSaleImageAPI = async (itemId: string, image: string) => {
  const input = { id: itemId, images: [image] };
    try {
        const updatedItemForSale = await client.graphql({
        query: updateItemForSale,
        variables: { input },
        });
        console.log('Item for sale updated successfully:', updatedItemForSale.data.updateItemForSale);
        return updatedItemForSale.data.updateItemForSale;
    } catch (error: any) {
        throw new HttpError(`Error updating item for sale image: ${error.message}`, error.statusCode || 500);
    }
};
