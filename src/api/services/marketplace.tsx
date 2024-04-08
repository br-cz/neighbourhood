import { generateClient } from '@aws-amplify/api';
import {
  createItemForSale,
  createUserLikedItems,
  deleteItemForSale,
  deleteUserLikedItems,
  updateItemForSale,
} from '@/src/graphql/mutations';
import { getItemForSale, listUserLikedItems } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';
import { getCurrentUserID } from './community';
import { UserLikedItems } from '@/src/API';
import { ItemForSale } from '@/src/types/types';

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
              id
              firstName
              lastName
              profilePic
              username
            }
            saveCount
            visibility
            userItemsForSaleId
            title
            updatedAt
            _version
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

export const deleteItemForSaleAPI = async (item: ItemForSale) => {
  try {
    const response = await client.graphql({
      query: deleteItemForSale,
      variables: {
        input: {
          id: item.id,
          _version: item._version,
        },
      },
    });
    console.log('Listing deleted successfully:', response.data.deleteItemForSale);
    return response.data.deleteItemForSale;
  } catch (error: any) {
    throw new HttpError(`Error deleting listing: ${error.message}`, error.statusCode || 500);
  }
};

export const updateItemForSaleImageAPI = async (
  itemId: string,
  image: string,
  _version: number
) => {
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
    throw new HttpError(
      `Error updating item for sale image: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const listUserSavedListingsAPI = async () => {
  try {
    const response = await client.graphql({
      query: listUserLikedItems,
    });
    const filteredResponse = response.data.listUserLikedItems.items.filter(
      (item: any) => !item._deleted
    );
    return filteredResponse;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving user saved listings: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const updateListingSaveCountAPI = async (listingId: string, adjustment: number) => {
  try {
    const listingResponse = await getListingAPI(listingId);
    if (!listingResponse) {
      throw new Error('Listing not found');
    }
    const { _version, saveCount = 0 } = listingResponse;
    const newSaveCount = Math.max(saveCount! + adjustment, 0);
    const updatedListing = await client.graphql({
      query: updateItemForSale,
      variables: {
        input: {
          id: listingId,
          saveCount: newSaveCount,
          _version,
        },
      },
    });
    console.log('Listing updated successfully:', updatedListing.data.updateItemForSale);
    return updatedListing.data.updateItemForSale;
  } catch (error: any) {
    throw new HttpError(
      `Error updating listing save count: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const createListingSaveAPI = async (listingId: string) => {
  const userId = getCurrentUserID();
  try {
    const createUserLikedItemsResponse = await client.graphql({
      query: createUserLikedItems,
      variables: {
        input: {
          itemForSaleId: listingId,
          userId,
        },
      },
    });
    await updateListingSaveCountAPI(listingId, 1);
    return createUserLikedItemsResponse.data.createUserLikedItems;
  } catch (error: any) {
    throw new HttpError(
      `Error creating user event connection: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const deleteListingSaveAPI = async (like: UserLikedItems) => {
  try {
    const deleteUserLikedItemsResponse = await client.graphql({
      query: deleteUserLikedItems,
      variables: {
        input: {
          id: like.id,
          _version: like._version,
        },
      },
    });
    await updateListingSaveCountAPI(like.itemForSaleId, -1);
    return deleteUserLikedItemsResponse.data.deleteUserLikedItems;
  } catch (error: any) {
    throw new HttpError(`Error deleting event save: ${error.message}`, error.statusCode || 500);
  }
};
