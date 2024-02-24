import React from 'react';
import { Box, Group, Stack, Text, TextInput } from '@mantine/core';

interface ProfileSetupProps {
  firstName: string;
  familyName: string;
  preferredUsername: string;
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    firstName?: string;
    familyName?: string;
    preferredUsername?: string;
    phoneNumber?: string;
  };
  touched: {
    firstName?: boolean;
    familyName?: boolean;
    preferredUsername?: boolean;
    phoneNumber?: boolean;
  };
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  firstName,
  familyName,
  preferredUsername,
  phoneNumber,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  return (
    <Box w={400}>
      <Stack mt="lg" gap="md">
        <TextInput
          label="Username"
          name="preferredUsername"
          value={preferredUsername}
          onChange={onChange}
          onBlur={onBlur}
          error={
            touched.preferredUsername && errors.preferredUsername
              ? errors.preferredUsername
              : undefined
          }
          radius="md"
        />
        <Group grow>
          <TextInput
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            radius="md"
          />
          <TextInput
            label="Last Name"
            name="familyName"
            value={familyName}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.familyName && errors.familyName ? errors.familyName : undefined}
            radius="md"
          />
        </Group>
        <TextInput
          label={
            <>
              <Group gap="xs">
                <Text size="sm" fw={500}>
                  Phone Number
                </Text>
                <Text size="sm" c="dimmed">
                  (optional)
                </Text>
              </Group>
            </>
          }
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
          onBlur={onBlur}
          error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
          radius="md"
        />
      </Stack>
    </Box>
  );
};
