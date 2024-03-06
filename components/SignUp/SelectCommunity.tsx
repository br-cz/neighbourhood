'import client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Stack, Text, Loader } from '@mantine/core';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';
import { Community } from '@/types/types';
import styles from '@/components/SignUp/SelectCommunity.module.css';

interface SelectCommunityProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  errors: {
    selectedCommunity?: string;
  };
  touched: {
    selectedCommunity?: boolean;
  };
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
  setFieldValue,
  onChange,
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
        const filteredCommunities = data.filter((element) => element.distanceKm <= 10).slice(0, 5);
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
    setSelectedCommunityId(id);
    setFieldValue('selectedCommunity', id); // Update the Formik state
  };

  return (
    <Box w={400}>
      <Stack mt="lg" gap="md">
        <SimpleGrid cols={1} spacing="xs" mt="sm" onChange={onChange} data-testid="communities">
          {touched.selectedCommunity && errors.selectedCommunity && (
            <Text color="red" size="xs">
              {errors.selectedCommunity}
            </Text>
          )}
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
                gap: '10px',
              }}
            >
              <Loader />
              <Text size="sm">Retrieving closest communities...</Text>
            </div>
          ) : nearestCommunities.length > 0 ? (
            nearestCommunities.map((element) => (
              <CommunityListItem
                key={element.community.id}
                community={element.community}
                onSelect={() => handleSelectCommunity(element.community.id)}
                isSelected={element.community.id === selectedCommunityId}
              />
            ))
          ) : (
            <>
              <Text size="sm" align="center" className={styles.glowOnce}>
                Oh no! No communities available 🧐
              </Text>
              <Text size="sm" align="center">
                Currently, we can only serve neighbours located in Winnipeg and close surrounding
                areas. Please go back and select a different address.
              </Text>
            </>
          )}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
