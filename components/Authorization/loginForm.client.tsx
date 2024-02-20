import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, signIn, signOut, type SignInInput } from 'aws-amplify/auth';
import { Box, Button, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getCommunity, getUser } from '@/src/graphql/queries';

const client = generateClient({});

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, handlers] = useDisclosure(false);
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function handleSignIn({ username, password }: SignInInput) {
    await handleSignOut();
    try {
      // Sign in with cognito
      await signIn({ username, password });

      // Get user ID from cognito
      const { userId } = await getCurrentUser();
      console.log('Currently logged in user ID from Cognito:', userId);

      // Initialize localStorage with corresponding user
      const user = await client.graphql({
        query: getUser,
        variables: { id: userId },
      });
      localStorage.setItem('currentUser', JSON.stringify(user.data.getUser));

      // Initialize localStorage with corresponding community
      if (user.data.getUser) {
        const communityID = user.data.getUser.selectedCommunity;
        const community = await client.graphql({
          query: getCommunity,
          variables: { id: communityID },
        });
        localStorage.setItem('currentCommunity', JSON.stringify(community.data.getCommunity));
      }
      router.push('/home');
    } catch (error) {
      console.log('Error signing in', error);
      setErrorMessage('Oops! Check your details and try again.');
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlers.open();
    handleSignIn({ username: email, password: pass });
  };

  const handleSignUp = () => {
    router.push('/signup');
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
          <Button variant="filled" radius="md" type="submit" loading={open}>
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
};

export default LoginForm;
