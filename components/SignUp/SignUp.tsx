'import client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Stepper, Button, Group, Stack, Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
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
import { signUpSchema } from './signUpValidation';

const client = generateClient({});
export const SignUp = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [loading, handlers] = useDisclosure(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      selectedCommunity: '', //should eventually change to an array since it's a multi-select
      preferredUsername: '',
      firstName: '',
      familyName: '',
      phoneNumber: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (parameters) => {
      try {
        // Step 1: Sign Up with AWS Cognito
        const cognitoResponse = await signUp({
          username: parameters.email,
          password: parameters.password,
          options: {
            userAttributes: {
              email: parameters.email,
              name: parameters.firstName,
              family_name: parameters.familyName,
              preferred_username: parameters.preferredUsername,
              address: parameters.address,
            },
          },
        });

        // Step 2: Create user entry in your database
        if (cognitoResponse.userId) {
          const createUserInput = {
            id: cognitoResponse.userId,
            username: parameters.preferredUsername,
            email: parameters.email,
            firstName: parameters.firstName,
            lastName: parameters.familyName,
            selectedCommunity: parameters.selectedCommunity, // Removed hard-code to see if it works
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
        notifications.show({
          title: 'Oops!',
          message: 'Something went wrong. Please contact an administrator.',
          color: 'red',
        });
      }
    },
  });

  const handleValidate = async (step: number): Promise<boolean> => {
    const stepFields: { [key: number]: string[] } = {
      0: ['email', 'password', 'confirmPassword'],
      1: ['address'],
      2: ['selectedCommunity'],
      3: ['firstName', 'familyName', 'preferredUsername', 'phoneNumber'],
    };
    const currentStepFields = stepFields[step] || [];
    const errors = await formik.validateForm();
    formik.setTouched(currentStepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    return currentStepFields.every((field) => !errors[field as keyof typeof formik.values]);
  };

  const handleNext = async () => {
    const isValid = await handleValidate(active);
    if (isValid) {
      nextStep();
    } else {
      notifications.show({
        title: 'Oops!',
        message: 'Please double-check your information and try again.',
        color: 'red',
      });
    }
  };

  const handleSubmit = async () => {
    handlers.open();
    const isValid = await handleValidate(active);
    if (isValid) {
      formik.submitForm();
    } else {
      notifications.show({
        title: 'Oops!',
        message: 'Please double-check your information and try again.',
        color: 'red',
      });
    }
    handlers.close();
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
        username: formik.values.email,
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
    } finally {
      handlers.close();
    }
  };

  const confirmSubmit = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Create your profile?
        </Title>
      ),
      children: (
        <Text size="sm">Please ensure that your information is correct before proceeding.</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Confirm', cancel: 'Back' },
      onConfirm: () => {
        handleSubmit();
      },
    });
  };

  const confirmCancel = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Return to login?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to return to the login? All signup information will be lost.
        </Text>
      ),
      confirmProps: { color: 'red', size: 'xs', radius: 'md' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Return to login', cancel: 'Nevermind' },
      onConfirm: () => {
        router.push('/');
      },
    });
  };

  const handleBack = () => (active === 0 ? confirmCancel() : prevStep());

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
              <LoginDetails
                email={formik.values.email}
                password={formik.values.password}
                confirmPassword={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
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
              <AddressInput
                address={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors}
                touched={formik.touched}
              />
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
              <SelectCommunity
                setFieldValue={formik.setFieldValue}
                onChange={formik.handleChange}
                errors={formik.errors}
                touched={formik.touched}
              />
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
              <ProfileSetup
                firstName={formik.values.firstName}
                familyName={formik.values.familyName}
                preferredUsername={formik.values.preferredUsername}
                phoneNumber={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
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
                We&apos;ve sent a verification code to your email at <u>{formik.values.email}</u>
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
            <Button radius="md" loading={loading} onClick={confirmSubmit}>
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
