import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Group } from '@mantine/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import UserPool from '@/components/Authorization/UserPool.js';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log('Login successful', session);
        router.push('/home');
      },
      onFailure: (err) => {
        console.error('Login failed', err);
        setErrorMessage(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Box style={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <Title order={2} style={{ textAlign: 'center' }} mb="lg">
          Login
        </Title>
        {errorMessage && <div style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</div>}
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mt="md"
        />
        <Group align="center" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginForm;
