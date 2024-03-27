'use client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Stack, Text, Loader, Center, Flex, Paper, Group } from '@mantine/core';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';
import {
  CommunityWithDistance,
  getClosestCommunities,
} from '../utils/relevantCommunitiesHelpers/getClosestCommunities';
import { SCHOOL_COMMUNITY_IDS } from '../utils/communityUtils';

interface SelectCommunityProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  selectedCommunity: string;

  coordinates: {
    lat: string;
    lng: string;
  };
}

export const SelectCommunity: React.FC<SelectCommunityProps> = ({
  setFieldValue,
  onChange,
  selectedCommunity,
  coordinates,
}) => {
  const [nearestCommunities, setNearestCommunities] = useState<CommunityWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noCommunities, setNoCommunities] = useState(false);
  const [retrievingError, setRetrievingError] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!coordinates.lat || !coordinates.lng) {
        setRetrievingError(true);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getClosestCommunities(`${coordinates.lat}, ${coordinates.lng}`);

        const filteredCommunities = response
          .filter((element: CommunityWithDistance) => element.distanceKm <= 10 || (SCHOOL_COMMUNITY_IDS.includes(element.community.id) && element.distanceKm <= 100));
        if (filteredCommunities.length === 0) {
          setNoCommunities(true);
          return;
        }
        filteredCommunities.sort((a: CommunityWithDistance, b: CommunityWithDistance) =>
          a.community.name.localeCompare(b.community.name)
        );
        setNearestCommunities(filteredCommunities);
        const relevantCommunities = filteredCommunities.map(
          (element: CommunityWithDistance) => element.community.id
        );
        setFieldValue('relevantCommunities', relevantCommunities);
      } catch (error) {
        setRetrievingError(true);
      } finally {
        setIsLoading(false);
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
        {isLoading ? (
          <Center>
            <Group>
              <Loader size="xs" type="dots" />
              <Text c="dimmed">Searching for communities...</Text>
            </Group>
          </Center>
        ) : noCommunities ? (
          <Paper withBorder shadow="md" p="md" radius="md" mt="md">
            <Text size="lg" fw={700} ta="center">
              No Communities Available 😔
            </Text>
            <Text size="sm" mt="sm" ta="center">
              Neighbourhood is currently only available in Winnipeg and surrounding areas. <br />
              Please go back and select a different address.
            </Text>
          </Paper>
        ) : retrievingError ? (
          <Paper withBorder shadow="md" p="md" radius="md" mt="md">
            <Text size="sm" mt="sm" ta="center">
              There was an error retrieving the communities. Please try again later.
            </Text>
          </Paper>
        ) : (
          <SimpleGrid cols={1} spacing="xs" mt="sm" onChange={onChange} data-testid="communities">
            {Object.values(nearestCommunities).map((element: CommunityWithDistance) => (
              <CommunityListItem
                key={element.community.id}
                community={element.community}
                onSelect={() => handleSelectCommunity(element.community.id)}
                selected={selectedCommunity === element.community.id}
                isAnyCommunitySelected={isAnyCommunitySelected}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Box>
  );
};
