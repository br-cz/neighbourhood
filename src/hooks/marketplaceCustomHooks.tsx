import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID, getCurrentUser } from './usersCustomHooks';
import {
  createItemForSaleAPI,
  createListingSaveAPI,
  deleteListingSaveAPI,
  getCommunityItemsForSaleAPI,
  listUserSavedListingsAPI,
} from '../api/services/marketplace';
import { ItemForSale, Visibility } from '@/types/types';

export const useCreateListing = () => {
  const handleCreateListing = async (itemData: any) => {
    try {
      const createdListing = await createItemForSaleAPI(
        getCurrentUserID(),
        getCurrentCommunityID(),
        { ...itemData, saveCount: 0, images: [itemData.itemImage] }
      );
      console.log('Listing created:', createdListing);
      return createdListing;
    } catch (err) {
      console.error('Error creating listing:', err);
      return err;
    }
  };

  return { handleCreateListing };
};

export const useFetchListings = (refresh: boolean = false) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const communityId = getCurrentCommunityID();
        const fetchedListings = await getCommunityItemsForSaleAPI(communityId);
        const visibleListings = fetchedListings.filter(
          (listing: ItemForSale) =>
            listing.visibility === Visibility.PUBLIC ||
            listing.seller.id === user!.id ||
            (listing.visibility === Visibility.FRIENDS_ONLY &&
              user!.friends!.includes(listing.seller.id))
        );
        setListings(visibleListings);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [refresh]);

  return { listings, loading, error };
};

export const useListingSaves = (listingId: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userListingSave, setUserListingSave] = useState<any>(null);
  const [error, setError] = useState('');
  const userId = getCurrentUserID();

  const fetchSaveStatus = async () => {
    try {
      const likesResponse = await listUserSavedListingsAPI();
      const userLike = likesResponse.find(
        (item) => item.itemForSaleId === listingId && item.userId === userId && !item._deleted
      );
      setIsSaved(!!userLike);
      setUserListingSave(userLike);
    } catch (err) {
      console.error('Error fetching save status:', err);
      setError('Failed to fetch save status');
    }
  };

  useEffect(() => {
    fetchSaveStatus();
  }, [listingId, userId]);

  const saveListing = async () => {
    if (!isSaved) {
      try {
        await createListingSaveAPI(listingId);
        fetchSaveStatus();
      } catch (err) {
        console.error('Error saving listing:', err);
        setError('Failed to save listing');
      }
    }
  };

  const unsaveListing = async () => {
    if (isSaved && userListingSave) {
      try {
        await deleteListingSaveAPI(userListingSave);
        fetchSaveStatus();
      } catch (err) {
        console.error('Error unsaving event:', err);
        setError('Failed to unsave event');
      }
    }
  };

  return { isSaved, saveListing, unsaveListing, error };
};

export const useUserListingSaves = () => {
  const [userListingSaves, setUserListingSaves] = useState(new Map());
  const userId = getCurrentUserID();

  useEffect(() => {
    const fetchUserSaves = async () => {
      try {
        const savesResponse = await listUserSavedListingsAPI();
        const userSavesMap = new Map();
        savesResponse.forEach((save) => {
          if (save.userId === userId && !save._deleted) {
            userSavesMap.set(save.itemForSaleId, true);
          }
        });
        setUserListingSaves(userSavesMap);
      } catch (error) {
        console.error('Failed to fetch user saves:', error);
      }
    };

    fetchUserSaves();
  }, [userId]);

  return { userListingSaves };
};
