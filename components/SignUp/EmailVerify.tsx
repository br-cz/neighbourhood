'import client';

import React from 'react';
import { Box, PinInput, Stack } from '@mantine/core';

export const EmailVerify = () => (
  <>
    <Box w={350}>
      <Stack mt="lg" gap="md">
        <PinInput length={6} type="number" ml="xl" />
      </Stack>
    </Box>
  </>
);
