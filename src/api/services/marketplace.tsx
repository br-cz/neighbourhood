import { generateClient } from '@aws-amplify/api';
import { createItemForSale, updateItemForSale } from '@/src/graphql/mutations';
import { getItemForSale } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getListingAPI = async (itemForSaleId: string) => {
  try {
    const response = await client.graphql({
      query: getItemForSale,
      variables: { id: itemForSaleId },
    });
    return response.data.getItemForSale;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving item for sale: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const getCommunityItemsForSaleAPI = async (communityId: string) => {
  const getCommunityItemsForSale = /* GraphQL */ `
    query GetCommunity($id: ID!) {
      getCommunity(id: $id) {
        id
        itemsForSale {
          items {
            contact
            createdAt
            description
            id
            images
            price
            seller {
              firstName
              lastName
              profilePic
              username
            }
            visibility
            userItemsForSaleId
            title
            updatedAt
            _deleted
          }
        }
      }
    }
  `;
  try {
    const response = await client.graphql({
      query: getCommunityItemsForSale,
      variables: { id: communityId },
    });
    const jsonResponse = JSON.parse(JSON.stringify(response));
    return jsonResponse.data.getCommunity.itemsForSale.items;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving community items for sale: ${error.message}`,
      error.statusCode || 500
    );
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

export const updateItemForSaleImageAPI = async (itemId: string, image: string, _version: number) => {
  try {
      const updatedItemForSale = await client.graphql({
      query: updateItemForSale,
      variables: {
          input: {
              id: itemId,
              images: [image],
              _version,
          },
      },
      });
      console.log('Item for sale updated successfully:', updatedItemForSale.data.updateItemForSale);
      return updatedItemForSale.data.updateItemForSale;
  } catch (error: any) {
      throw new HttpError(`Error updating item for sale image: ${error.message}`, error.statusCode || 500);
  }
};
