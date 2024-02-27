'import client';

import React from 'react';
import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';

// placeholder data
const communities = {
  1: {
    id: '17b85438-7fcf-4f78-b5ef-cee07c6dedae',
    name: 'University of Manitoba',
    location: 'Winnipeg, MB',
    image:
      'data:image/png;base64,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',
    postalCode: 'R3T 2N2',
    members: [],
    posts: [],
  },
};

interface SelectCommunityProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  errors: {
    selectedCommunity?: string;
  };
  touched: {
    selectedCommunity?: boolean;
  };
}

export const SelectCommunity: React.FC<SelectCommunityProps> = ({
  setFieldValue,
  onChange,
  errors,
  touched,
}) => {
  const handleSelectCommunity = (id: string) => {
    setFieldValue('selectedCommunity', id); // Update the Formik state
  };

  return (
    <Box w={400}>
      <Stack mt="lg" gap="md">
        <SimpleGrid cols={1} spacing="xs" mt="sm" onChange={onChange} data-testid="communities">
          {touched.selectedCommunity && errors.selectedCommunity && (
            <Text c="red" fz="xs">
              {errors.selectedCommunity}
            </Text>
          )}
          {Object.values(communities).map((community) => (
            <CommunityListItem
              key={community.id}
              community={community}
              onSelect={() => handleSelectCommunity(community.id)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
