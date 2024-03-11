'use client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Stack, Text, LoadingOverlay } from '@mantine/core';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';
import { Community } from '@/types/types';
import { FormikErrors, FormikTouched } from 'formik';

interface SelectCommunityProps {
  communities: Community[];
  loading: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  selectedCommunity: string[];
  errors: FormikErrors<{ selectedCommunity: string[] }>;
  touched: FormikTouched<{ selectedCommunity: Boolean[] }>;
  coordinates: {
    lat: string;
    lng: string;
  };
}

interface NearestCommunity {
  community: Community;
  distanceKm: number;
}

export const SelectCommunity: React.FC<SelectCommunityProps> = ({
  communities,
  loading,
  setFieldValue,
  onChange,
  selectedCommunity,
  errors,
  touched,
  coordinates,
}) => {
  const [nearestCommunities, setNearestCommunities] = useState<NearestCommunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunityId, setSelectedCommunityId] = useState('');

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!coordinates.lat || !coordinates.lng) return;

      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `/api/getClosestCommunities?coordinates=${coordinates.lat}, ${coordinates.lng}`
        );
        if (!response.ok) throw new Error('Failed to fetch communities');

        const data = await response.json();
        const filteredCommunities = data
          .filter((element: NearestCommunity) => element.distanceKm <= 10)
          .slice(0, 5);
        setNearestCommunities(filteredCommunities); //
      } catch (error) {
        console.error('Error fetching nearest communities:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchCommunities();
  }, [coordinates]);

  const handleSelectCommunity = (id: string, isSelected: boolean) => {
    setSelectedCommunityId(id);
    //console.log('id inside handleSelectCommunity', id);

    const prevSelected = selectedCommunity;
    const prevArray = Array.isArray(prevSelected) ? prevSelected : [];
    //console.log('prevArray', prevArray);

    let newValue;
    if (isSelected) {
      newValue = prevArray.includes(id) ? prevArray : [...prevArray, id];
    } else {
      newValue = prevArray.filter((existingId) => existingId !== id);
    }

    setFieldValue('selectedCommunity', newValue);
  };
  // console.log('Touched.selectedCommunity Error', touched.selectedCommunity); //This does not work for now, so not using it as a conditional for error message display
  return (
    <Box w="25vw">
      <Stack mt="lg" gap="md">
        <SimpleGrid cols={1} spacing="xs" mt="sm" onChange={onChange} data-testid="communities">
          {errors.selectedCommunity && (
            <Text c="red" fz="sm">
              {errors.selectedCommunity}
            </Text>
          )}
          {Object.values(communities).map((community: Community) => (
            <CommunityListItem
              key={community.id}
              community={community}
              onSelect={(isSelected) => handleSelectCommunity(community.id, isSelected)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
