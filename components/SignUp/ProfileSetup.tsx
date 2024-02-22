import React from 'react';
import { Box, Group, Stack, TextInput } from '@mantine/core';

interface ProfileSetupProps {
  formData: {
    name: string;
    familyName: string;
    preferredUsername: string;
    phoneNumber: string;
  };
  updateFormData: (fieldValues: Partial<any>) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ formData, updateFormData }) => (
  <Box w={400}>
    <Stack mt="lg" gap="md">
      <TextInput
        label="Username"
        value={formData.preferredUsername}
        onChange={(e) => updateFormData({ preferredUsername: e.currentTarget.value })}
        radius="md"
      />
      <Group grow>
        <TextInput
          label="First Name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.currentTarget.value })}
          radius="md"
        />
        <TextInput
          label="Last Name"
          value={formData.familyName}
          onChange={(e) => updateFormData({ familyName: e.currentTarget.value })}
          radius="md"
        />
      </Group>
      <TextInput
        label="Phone Number (optional)"
        value={formData.phoneNumber}
        onChange={(e) => updateFormData({ phoneNumber: e.currentTarget.value })}
        radius="md"
      />
    </Stack>
  </Box>
);
