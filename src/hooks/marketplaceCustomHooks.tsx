import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID } from './usersCustomHooks';
import { createItemForSaleAPI, getCommunityItemsForSaleAPI } from '../api/services/marketplace';

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
        const communityId = getCurrentCommunityID();
        const fetchedListings = await getCommunityItemsForSaleAPI(communityId);
        setListings(fetchedListings);
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
