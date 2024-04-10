'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { handleSignIn } from '@/src/utils/authUtils';

import styles from '@/src/components/Authorization/LoginForm/LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, handlers] = useDisclosure(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlers.open();
    await handleSignIn({
      username: email,
      password: pass,
      router,
      handlers,
      setErrorMessage,
    });
  };

  const handleSignUp = () => {
    router.push('/get-started');
  };

  return (
    <Box style={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          value={email}
          radius="md"
          mt="sm"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          value={pass}
          radius="md"
          onChange={(e) => setPass(e.currentTarget.value)}
          mt="md"
        />
        {errorMessage && (
          <Text c="red" m="xs" size="sm">
            {errorMessage}
          </Text>
        )}

        <Group justify="center" mt="lg">
          <Button variant="filled" radius="md" type="submit" loading={loading}>
            Log In
          </Button>
          <Text c="dimmed">or</Text>
          <Button radius="md" onClick={handleSignUp} className={styles.customButton}>
            Get Started
          </Button>
        </Group>
      </form>
    </Box>
  );
}
