import React from 'react';
import { Box, Stack, TextInput } from '@mantine/core';

interface AddressInputProps {
  formData: { address: string };
  updateFormData: (fieldValues: Partial<any>) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({ formData, updateFormData }) => (
  <Box w={350}>
    <Stack mt="lg" gap="md">
      <TextInput
        label="Address"
        value={formData.address}
        onChange={(e) => updateFormData({ address: e.currentTarget.value })}
        radius="md"
      />
    </Stack>
  </Box>
);
