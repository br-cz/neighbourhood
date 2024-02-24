import React from 'react';
import { Stack, TextInput, PasswordInput, Box } from '@mantine/core';

interface LoginDetailsProps {
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  };
}

export const LoginDetails: React.FC<LoginDetailsProps> = ({
  email,
  password,
  confirmPassword,
  onChange,
  onBlur,
  errors,
  touched,
}) => (
  <Box w={350}>
    <Stack mt="lg" gap="md">
      <TextInput
        label="Email"
        name="email"
        value={email}
        onChange={onChange}
        onBlur={onBlur}
        error={touched.email && errors.email ? errors.email : undefined}
        radius="md"
      />
      <PasswordInput
        label="Password"
        name="password"
        value={password}
        onChange={onChange}
        onBlur={onBlur}
        error={touched.password && errors.password ? errors.password : undefined}
        radius="md"
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        onBlur={onBlur}
        error={
          touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined
        }
        radius="md"
      />
    </Stack>
  </Box>
);
