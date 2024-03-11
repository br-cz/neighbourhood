import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID, getCurrentUser } from './usersCustomHooks';
import { createItemForSaleAPI, getCommunityItemsForSaleAPI } from '../api/services/marketplace';
import { ItemForSale, Visibility } from '@/types/types';

export const useCreateListing = () => {
  const handleCreateListing = async (itemData: any) => {
    try {
      const createdListing = await createItemForSaleAPI(
        getCurrentUserID(),
        getCurrentCommunityID(),
        { ...itemData, images: [itemData.itemImage] }
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
