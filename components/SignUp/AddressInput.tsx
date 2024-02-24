import React from 'react';
import { Box, Stack, TextInput } from '@mantine/core';

interface AddressInputProps {
  address: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error: {
    address?: string;
  };
  touched: {
    address?: boolean;
  };
}

export const AddressInput: React.FC<AddressInputProps> = ({
  address,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <Box w={350}>
    <Stack mt="lg" gap="md">
      <TextInput
        label="Address"
        name="address"
        value={address}
        onChange={onChange}
        onBlur={onBlur}
        error={touched.address && error.address ? error.address : undefined} // Display validation error if the field was touched
        radius="md"
      />
    </Stack>
  </Box>
);
