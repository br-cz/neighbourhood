'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { TextInput, PasswordInput, Button, Box, Title } from '@mantine/core';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '@/components/Authorization/UserPool.js';

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
  const router = useRouter(); // Initialize useRouter for navigation

  const previousStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1 && password !== confirmPassword) {
      alert('Passwords do not match.');
      return; // Prevent the form from proceeding
    }

    //Compile attributes and send to cognito
    if (step === 2) {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'family_name', Value: familyName }),
        new CognitoUserAttribute({ Name: 'preferred_username', Value: preferredUsername }),
        new CognitoUserAttribute({ Name: 'name', Value: name }),
        new CognitoUserAttribute({ Name: 'address', Value: address }),
      ];

      UserPool.signUp(email, password, attributeList, [], (err, data) => {
        if (err) {
          console.error(err.message || JSON.stringify(err));
          setSignUpError(err.message || 'An error occurred during signup.');
        } else {
          console.log(data);
          setIsSignUpSuccessful(true);
          setTimeout(() => router.push('/login'), 10000);
        }
      });
    } else {
      nextStep(); // Proceed to the next step if not the last step
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

  const navigateToLogin = () => router.push('/login');

  return (
    <Box style={{ maxWidth: 300 }} mx="auto">
      {isSignUpSuccessful ? (
        <div>
          <Title order={2} style={{ textAlign: 'center' }} mb="lg">
            Sign up Successful!
          </Title>
          <p>Thank you for signing up. You can now login to your account.</p>
          <Button onClick={navigateToLogin}>Login</Button> {/* Button to navigate to /login */}
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
