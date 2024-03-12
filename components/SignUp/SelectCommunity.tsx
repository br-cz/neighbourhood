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
  selectedCommunity: string;
  errors: FormikErrors<{ selectedCommunity: string }>;
  touched: FormikTouched<{ selectedCommunity: Boolean }>;
  coordinates: {
    lat: string;
    lng: string;
  };
}

export const SelectCommunity: React.FC<SelectCommunityProps> = ({
  communities,
  setFieldValue,
  onChange,
  selectedCommunity,
  errors,
  touched,
  coordinates,
}) => {
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

  const handleSelectCommunity = (id: string) => {
    setFieldValue('selectedCommunity', id);
  };

  const isAnyCommunitySelected = !!selectedCommunity;

  return (
    <Box w="25vw">
      <Stack mt="lg" gap="md">
        <SimpleGrid cols={1} spacing="xs" mt="sm" onChange={onChange} data-testid="communities">
          {errors.selectedCommunity && (
            <Text c="red" fz="sm">
              {errors.selectedCommunity}
            </Text>
          )}
          {communities.map((community: Community) => (
            <CommunityListItem
              key={community.id}
              community={community}
              selected={selectedCommunity === community.id}
              onSelect={() => handleSelectCommunity(community.id)}
              isAnyCommunitySelected={isAnyCommunitySelected}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
