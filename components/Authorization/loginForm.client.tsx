'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { Box, Button, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { getCommunity, getUser } from '@/src/graphql/queries';

const client = generateClient({});

interface SignInParams {
  username: string;
  password: string;
  clientInput: any;
  router: any;
  notificationsInput: any;
  handlers: any;
  setErrorMessage: (message: string) => void;
}

export async function handleSignIn({
  username,
  password,
  clientInput,
  router,
  notificationsInput,
  handlers,
  setErrorMessage,
}: SignInParams): Promise<void> {
  await signOut({ global: true });
  try {
    await signIn({ username, password });
    const { userId } = await getCurrentUser();

    const user = await clientInput.graphql({ query: getUser, variables: { id: userId } });
    localStorage.setItem('currentUserID', JSON.stringify(userId));
    localStorage.setItem('currentUser', JSON.stringify(user.data.getUser));

    if (user.data.getUser) {
      const communityID = user.data.getUser.selectedCommunity;
      const community = await clientInput.graphql({
        query: getCommunity,
        variables: { id: communityID },
      });
      localStorage.setItem('currentCommunityID', JSON.stringify(communityID));
      localStorage.setItem('currentCommunity', JSON.stringify(community.data.getCommunity));
    }

    router.push('/home');
    notificationsInput.show({
      radius: 'md',
      title: 'Hey, Neighbour! 👋 ',
      message: `Logged in successfully. Welcome back, ${user.data.getUser?.firstName}!`,
    });
  } catch (error) {
    handlers.close();
    console.log('Error signing in', error);
    setErrorMessage('Oops! Check your details and try again.');
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, handlers] = useDisclosure(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlers.open();
    handleSignIn({
      username: email,
      password: pass,
      clientInput: client,
      router,
      notificationsInput: notifications,
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
          <Button variant="outline" radius="md" onClick={handleSignUp}>
            Get Started
          </Button>
        </Group>
      </form>
    </Box>
  );
}
