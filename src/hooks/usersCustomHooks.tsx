import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { HttpError } from '../models/error/HttpError';
import { getUserAPI, updateUserAPI } from '../api/services/user';
import {
  storeImage,
  retrieveImage as retrieveProfilePicture,
} from '@/src/utils/s3Helpers/UserProfilePictureS3Helper';

export const userUpdateSubject = new Subject<void>();

export const getCurrentUserID = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('currentUserID')!);
  }
  return null;
};
export const getCurrentUser = async () => getUserAPI(getCurrentUserID());

export const useCurrentUser = (refresh: boolean = false) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<HttpError | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        if (user) {
          const profilePicture = await retrieveProfilePicture(user.id);
          const userWithImage = {
            ...user,
            profilePic: profilePicture,
          };
          setCurrentUser(userWithImage);
        }
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err);
        } else {
          console.error('An unexpected error occurred', err);
          setError(new HttpError('An unexpected error occurred', 500));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
    const subscription = userUpdateSubject.subscribe({
      next: async () => {
        fetchCurrentUser();
      },
    });
    return () => subscription.unsubscribe();
  }, [refresh]);

  const updateUserProfile = async (values: any, profilePicFile?: File) => {
    try {
      let profilePicUrl = currentUser!.profilePic;
      if (profilePicFile) {
        profilePicUrl = await storeImage(profilePicFile, currentUser!.id);
      }
      const updatedUser = await updateUserAPI({
        ...currentUser,
        ...values,
        profilePic: profilePicUrl,
      });
      setCurrentUser(updatedUser);
    } catch (err) {
      throw new HttpError('Error updating user profile', 500);
    }
  };

  return {
    currentUser,
    loading,
    error,
    selectedCommunity: currentUser?.selectedCommunity,
    updateUserProfile,
  };
};
