import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack, TextInput } from '@mantine/core';
import useGoogleMapsApi from '@/src/hooks/googleMapsAPI'; // Adjust the path as necessary

export const AddressInput = ({
  address,
  onChange,
  onBlur,
  error,
  touched,
  setFieldValue,
  onAddressSelection,
  onCoordinatesChange,
}) => {
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMapsApi(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  );
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    if (isLoaded && !loadError && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'ca' },
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const fullAddress = place.formatted_address;
        const coordinates = {
          lat: `${place.geometry.location.lat()}`,
          lng: `${place.geometry.location.lng()}`,
        };
        onCoordinatesChange(coordinates);
        setLocalAddress(fullAddress);
        onChange(fullAddress);
        setFieldValue('address', fullAddress, true);
        onAddressSelection(true);
      });
    }
  }, [isLoaded, loadError, onChange, onBlur]);

  const handleInputChange = (e) => {
    setLocalAddress(e.target.value);
    if (e.target.value !== address) {
      onAddressSelection(false);
    }
  };

  return (
    <Box w={350}>
      <Stack mt="lg" gap="md">
        <TextInput
          label="Address"
          name="address"
          value={localAddress}
          onChange={handleInputChange}
          onBlur={onBlur}
          error={touched.address && error.address ? error.address : undefined}
          radius="md"
          data-testid="address"
          ref={inputRef}
        />
      </Stack>
    </Box>
  );
};
