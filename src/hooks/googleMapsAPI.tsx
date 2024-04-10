import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export const useGoogleMapsApi = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  if (apiKey === '') {
    throw new Error('Api key does not exist');
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error: any) => {
        setLoadError(error);
      });
  }, [apiKey]);

  return { isLoaded, loadError };
};
