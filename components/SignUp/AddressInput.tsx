import React from 'react';
import { Box, Stack, TextInput } from '@mantine/core';

// interface AddressInputProps {
//   formData: { address: string };
//   updateFormData: (fieldValues: Partial<any>) => void;
// }

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
}) => {
  // Log the touched and errors state to debug
  React.useEffect(() => {
    console.log('Touched:', touched);
    console.log('Errors:', error);
  }, [touched, error]); // Only re-run the effect if touched or errors changes

  return (
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
};
