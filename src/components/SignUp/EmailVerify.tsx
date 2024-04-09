import React from 'react';
import { Box, PinInput, Stack } from '@mantine/core';

interface EmailVerifyProps {
  verificationCode: (code: string) => void;
}

export const EmailVerify: React.FC<EmailVerifyProps> = ({ verificationCode }) => {
  const handleChange = (value: string) => {
    if (value.length === 6) {
      verificationCode(value);
    }
  };

  return (
    <>
      <Box w={350}>
        <Stack mt="lg" gap="md">
          <PinInput length={6} type="number" ml="xl" onChange={handleChange} />
        </Stack>
      </Box>
    </>
  );
};
