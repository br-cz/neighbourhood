'import client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Stepper, Button, Group, Stack, Title, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faKey,
  faLocationDot,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { LoginDetails } from '@/components/SignUp/LoginDetails.tsx';
import { AddressInput } from './AddressInput';
import { SelectCommunity } from './SelectCommunity';
import { ProfileSetup } from './ProfileSetup';
import { EmailVerify } from './EmailVerify';
import { createUser, createUserCommunity } from '@/src/graphql/mutations';

const client = generateClient({});

export const SignUp = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [loading, handlers] = useDisclosure(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    selectedCommunity: '17b85438-7fcf-4f78-b5ef-cee07c6dedae',
    preferredUsername: '',
    name: '',
    familyName: '',
    phoneNumber: '',
  });
  const [verificationCode, setVerificationCode] = useState('');

  const updateFormData = (fieldValues: Partial<FormData>) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...fieldValues }));
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    handlers.open();
    try {
      // Step 1: Sign Up with AWS Cognito
      const cognitoResponse = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name,
            family_name: formData.familyName,
            preferred_username: formData.preferredUsername,
            address: formData.address,
          },
        },
      });

      // Step 2: Create user entry in your database
      if (cognitoResponse.userId) {
        const createUserInput = {
          id: cognitoResponse.userId,
          username: formData.preferredUsername,
          email: formData.email,
          firstName: formData.name,
          lastName: formData.familyName,
          selectedCommunity: '17b85438-7fcf-4f78-b5ef-cee07c6dedae', // Hardcoded as U of M for now, replace with ID of user selection
          postalCode: '',
        };

        await client.graphql({
          query: createUser,
          variables: {
            input: createUserInput,
          },
        });

        await client.graphql({
          query: createUserCommunity,
          variables: {
            input: {
              communityId: '17b85438-7fcf-4f78-b5ef-cee07c6dedae', // Hardcoded as U of M for now, replace with ID of user selection
              userId: cognitoResponse.userId,
            },
          },
        });
      }

      console.log('Sign up success:', cognitoResponse.userId);
      nextStep();
    } catch (error) {
      console.log('error signing up:', error);
    }
    handlers.close();
  };

  const handleNext = () => {
    nextStep();
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      notifications.show({
        title: 'Verification Error',
        message: 'Failed to verify email. Please try again.',
        color: 'red',
      });
      return;
    }

    try {
      handlers.open();
      await confirmSignUp({
        username: formData.email,
        confirmationCode: verificationCode,
      });
      notifications.show({
        title: 'Signed up successfully!',
        message: 'You can now log in to continue to Neighbourhood.',
      });
      router.push('/');
    } catch (error) {
      notifications.show({
        title: 'Verification Error',
        message: 'Failed to verify email. Please try again.',
        color: 'red',
      });
    }
    handlers.close();
  };

  const handleBack = () => (active === 0 ? router.push('/') : prevStep());

  return (
    <>
      <form>
        <Stepper active={active} size="md" onStepClick={setActive} allowNextStepsSelect={false}>
          <Stepper.Step
            label="Step 1"
            description="Login details"
            icon={<FontAwesomeIcon icon={faKey} />}
          >
            <Stack align="center" gap="xs">
              <Title mt="xl" order={2}>
                Hey, Neighbour!
              </Title>
              <Text c="dimmed" size="md">
                Let&apos;s get started with some basic information:
              </Text>
              <LoginDetails formData={formData} updateFormData={updateFormData} />
            </Stack>
          </Stepper.Step>
          <Stepper.Step
            label="Step 2"
            description="Find your area"
            icon={<FontAwesomeIcon icon={faLocationDot} />}
          >
            <Stack align="center" gap="xs">
              <Title mt="xl" order={2}>
                Where are you located?
              </Title>
              <Text c="dimmed" size="md">
                We&apos;ll use this to find communities near you!
              </Text>
              <AddressInput formData={formData} updateFormData={updateFormData} />
            </Stack>
          </Stepper.Step>
          <Stepper.Step
            label="Step 3"
            description="Join a community"
            icon={<FontAwesomeIcon icon={faPeopleGroup} />}
          >
            <Stack align="center" gap="xs">
              <Title mt="xl" order={2}>
                Select your community
              </Title>
              <Text c="dimmed" size="md">
                If you&apos;re in-between communities - don&apos;t worry, you can join more later.
              </Text>
              <SelectCommunity />
            </Stack>
          </Stepper.Step>
          <Stepper.Step
            label="Step 4"
            description="Set up profile"
            icon={<FontAwesomeIcon icon={faIdCard} />}
          >
            <Stack align="center" gap="xs">
              <Title mt="xl" order={2}>
                How do you want to be known?
              </Title>
              <Text c="dimmed" size="md">
                Your profile is how others will see you in the community.
              </Text>
              <ProfileSetup formData={formData} updateFormData={updateFormData} />
            </Stack>
          </Stepper.Step>
          <Stepper.Step
            label="Step 5"
            description="Verify email"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
          >
            <Stack align="center" gap="xs">
              <Title mt="xl" order={2}>
                Almost there!
              </Title>
              <Text c="dimmed" size="md">
                We&apos;ve sent a verification code to your email at <u>{formData.email}</u>
              </Text>
              <EmailVerify verificationCode={(code: string) => setVerificationCode(code)} />
            </Stack>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active !== 4 && (
            <Button variant="default" radius="md" onClick={handleBack}>
              Back
            </Button>
          )}
          {active === 3 ? (
            <Button radius="md" loading={loading} onClick={handleSubmit}>
              Create Profile
            </Button>
          ) : active === 4 ? (
            <Button radius="md" loading={loading} onClick={handleVerify}>
              Verify
            </Button>
          ) : (
            <Button radius="md" onClick={handleNext}>
              Continue
            </Button>
          )}
        </Group>
      </form>
    </>
  );
};
