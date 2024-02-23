'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { TextInput, PasswordInput, Button, Box, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createUser } from '@/src/graphql/mutations';
import { signUpSchema } from './signUpValidation';
import { useFormik } from 'formik';

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
  const [step, setStep] = useState(1);

  const previousStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);
  const navigateToLogin = () => router.push('/'); // Use the router to navigate to login
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      family_name: '',
      preferred_username: '',
      address: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (parameters) => {
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
            selectedCommunity: '17b85438-7fcf-4f78-b5ef-cee07c6dedae', // Hardcoded as U of M for now, replace with ID of user selection
            postalCode: '',
          };

          await client.graphql({
            query: createUser,
            variables: {
              input: createUserInput,
            },
          });
        }

        //console.log('Sign up success:', cognitoResponse.userId);
        setIsSignUpSuccessful(true);
        notifications.show({
          radius: 'md',
          title: 'Signed up successfully!',
          message: 'You can now log in to continue to Neighbourhood.',
        });
      } catch (error) {
        console.log('error signing up:', error);
        //setSignUpError('An unexpected error occurred.');
      }
    },
  });

  // Render form fields based on the current step
  const renderStep = (currentStep: number) => {
    //Can make adjustments here to make the condition smaller, ideally since we are using it for sign up,
    //the user must touch the password fields so having touch conditions just for that should suffice - even if autofill is used to fill up the rest
    const isStep1Valid =
      !formik.errors.email &&
      !formik.errors.password &&
      formik.touched.password &&
      !formik.errors.confirmPassword &&
      formik.touched.confirmPassword &&
      !formik.errors.name &&
      !formik.errors.family_name &&
      !formik.errors.preferred_username;

    const isStep2Valid = formik.touched.address && !formik.errors.address;

    switch (currentStep) {
      case 1:
        return (
          <>
            <TextInput
              label="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
              required
            />
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
              required
            />
            <TextInput
              label="First Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
              required
            />
            <TextInput
              label="Family Name"
              name="family_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.family_name}
              error={
                formik.touched.family_name && formik.errors.family_name
                  ? formik.errors.family_name
                  : undefined
              }
              required
            />
            <TextInput
              label="Preferred Username"
              name="preferred_username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.preferred_username}
              error={
                formik.touched.preferred_username && formik.errors.preferred_username
                  ? formik.errors.preferred_username
                  : undefined
              }
              required
            />
            <Button onClick={navigateToLogin} style={{ marginRight: '1rem' }}>
              Back
            </Button>
            <Button onClick={nextStep} disabled={!isStep1Valid}>
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              label="Address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={
                formik.touched.address && formik.errors.address ? formik.errors.address : undefined
              }
              required
            />
            <Button onClick={previousStep} style={{ marginRight: '1rem' }}>
              Back
            </Button>
            <Button type="submit" disabled={!isStep2Valid}>
              Sign Up
            </Button>
          </>
        );
      default:
        return null;
    }
  };

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
        <form onSubmit={formik.handleSubmit}>
          <Title order={2} style={{ textAlign: 'center' }} mb="lg">
            Sign Up
          </Title>
          {renderStep(step)}
        </form>
      )}{' '}
    </Box>
  );
};

export default SignUpForm;
