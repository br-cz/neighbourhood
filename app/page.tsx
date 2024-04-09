'use client';

import React from 'react';
import { Box } from '@mantine/core';
import Image from 'next/image';
import LoginForm from '@/src/components/Authorization/loginForm.client';

const containerStyling = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};
export default function MainPage() {
  console.log('in login');

  return (
    <div style={containerStyling}>
      <Box>
        <Image src="/logo.svg" width={450} height={100} alt="Neighbourhood Logo" priority />
        <LoginForm />
      </Box>
    </div>
  );
}
