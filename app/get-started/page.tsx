'use client';

import { Box } from '@mantine/core';
import { SignUp } from '@/components/SignUp/SignUp';

export default function GetStartedPage() {
  return (
    <>
      <Box mt={50} mx={100}>
        <SignUp />
      </Box>
    </>
  );
}
