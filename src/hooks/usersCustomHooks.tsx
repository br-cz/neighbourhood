import { useState, useEffect } from 'react';
import { HttpError } from '../models/error/HttpError';
import { getUserAPI } from '../api/services/user';

export const getCurrentUserID = () => JSON.parse(localStorage.getItem('currentUserID')!);
export const getCurrentUser = async () => getUserAPI(getCurrentUserID());

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<HttpError | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
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
  }, []); // Empty dependency array means this effect runs once on mount

  return { currentUser, loading, error };
};
