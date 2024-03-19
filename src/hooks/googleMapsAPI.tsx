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
      apiKey, // Your Google Maps API key
      version: 'weekly',
      libraries: ['places'], // Specify the libraries you need, e.g., "places" for Places API
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
        // The API can now be used, for example to initialize Autocomplete
      })
      .catch((error: any) => {
        // Explicitly specify the type of 'error' as 'any'
        setLoadError(error);
      });
  }, [apiKey]);

  return { isLoaded, loadError };
};
