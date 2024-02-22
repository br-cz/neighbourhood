import React from 'react';
import { Stack, TextInput, PasswordInput, Box } from '@mantine/core';

interface LoginDetailsProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  updateFormData: (fieldValues: Partial<any>) => void;
}

export const LoginDetails: React.FC<LoginDetailsProps> = ({ formData, updateFormData }) => (
  <Box w={350}>
    <Stack mt="lg" gap="md">
      <TextInput
        label="Email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.currentTarget.value })}
        radius="md"
      />
      <PasswordInput
        label="Password"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.currentTarget.value })}
        radius="md"
      />
      <PasswordInput
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData({ confirmPassword: e.currentTarget.value })}
        radius="md"
      />
    </Stack>
  </Box>
);
