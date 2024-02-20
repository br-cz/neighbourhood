'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { TextInput, PasswordInput, Button, Box, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createUser } from '@/src/graphql/mutations';

const client = generateClient({});

type SignUpParameters = {
  email: string;
  password: string;
  name: string;
  family_name: string;
  preferred_username: string;
  address: string;
};

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [preferredUsername, setPreferredUsername] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const router = useRouter();

  const previousStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  async function handleSignUp(parameters: SignUpParameters) {
    try {
      // Sign up with cognito
      const cognitoResponse = await signUp({
        username: parameters.email,
        password: parameters.password,
        options: {
          userAttributes: {
            email: parameters.email,
            name: parameters.name,
            family_name: parameters.family_name,
            preferred_username: parameters.preferred_username,
            address: parameters.address,
          },
        },
      });

      // Create user entry in database
      if (cognitoResponse.userId) {
        const createUserInput = {
          id: cognitoResponse.userId,
          username: parameters.preferred_username,
          email: parameters.email,
          firstName: parameters.name,
          lastName: parameters.family_name,
          selectedCommunity: 'dcc7f7e2-f0a2-476c-9890-542006de6d20', // Hardcoded as Waverley for now, replace with ID of user selection
          postalCode: '',
        };

        await client.graphql({
          query: createUser,
          variables: {
            input: createUserInput,
          },
        });
      }

      console.log('Sign up success:', cognitoResponse.userId);
      setIsSignUpSuccessful(true);
      notifications.show({
        title: 'Signed up successfully!',
        message: 'You can now log in to continue to Neighbourhood.',
      });
    } catch (error) {
      console.log('error signing up:', error);
      setSignUpError('An unexpected error occurred.');
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1 && password !== confirmPassword) {
      alert('Passwords do not match.');
      return; // Prevent the form from proceeding
    }

    //Compile attributes and send to cognito
    if (step === 2) {
      handleSignUp({
        email,
        password,
        name,
        family_name: familyName,
        preferred_username: preferredUsername,
        address,
      });
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
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
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              required
            />
            <TextInput
              label="First Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
            <TextInput
              label="Family Name"
              value={familyName}
              onChange={(e) => setFamilyName(e.currentTarget.value)}
              required
            />
            <TextInput
              label="Preferred Username"
              value={preferredUsername}
              onChange={(e) => setPreferredUsername(e.currentTarget.value)}
              required
            />
            <Button onClick={nextStep}>Next</Button>
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
              required
            />
            <Button onClick={previousStep}>Previous</Button>
            <Button type="submit">Sign Up</Button>
          </>
        );
      default:
        return null; // For additional steps or confirmation screens
    }
  };

  const navigateToLogin = () => router.push('/');

  return (
    <Box style={{ maxWidth: 300 }} mx="auto">
      {isSignUpSuccessful ? (
        <div>
          <Title order={2} style={{ textAlign: 'center' }} mb="lg">
            Sign up Successful!
          </Title>
          <p>Thank you for signing up. You can now login to your account.</p>
          <Button onClick={navigateToLogin}>Login</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Title order={2} style={{ textAlign: 'center' }} mb="lg">
            Sign Up
          </Title>
          {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}
          {renderStep()}
        </form>
      )}
    </Box>
  );
};

export default SignUpForm;
