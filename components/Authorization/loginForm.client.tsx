import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Group } from '@mantine/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import UserPool from '@/components/Authorization/UserPool.js';

// Configure your Cognito User Pool IDs here
const USER_POOL_ID = 'your-user-pool-id';
const CLIENT_ID = 'your-client-id';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        // Handle successful login, e.g., redirect to a dashboard
      },
      onFailure: (err) => {
        console.error('Login failed', err);
        setErrorMessage(err.message || JSON.stringify(err));
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // User was signed up by an admin and must provide a new password and required attributes, if any, to complete authentication.
        console.log('New password required');
        // You can prompt the user to enter a new password and required attributes here, then call
        // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this)
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
