'use client';

import React, { useState } from 'react';
import { Box, SimpleGrid, Stack, Text, LoadingOverlay } from '@mantine/core';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';
import { useFetchAllCommunities } from '@/src/hooks/communityCustomHooks';
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
}

export const SelectCommunity: React.FC<SelectCommunityProps> = ({
  communities,
  loading,
  setFieldValue,
  onChange,
  selectedCommunity,
  errors,
  touched,
}) => {
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
