'import client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, confirmSignUp } from '@aws-amplify/auth';
import { generateClient } from '@aws-amplify/api';
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
import { useFormik } from 'formik';
import { LoginDetails } from '@/components/SignUp/LoginDetails.tsx';
import { AddressInput } from './AddressInput';
import { SelectCommunity } from './SelectCommunity';
import { ProfileSetup } from './ProfileSetup';
import { EmailVerify } from './EmailVerify';
import { createUser, createUserCommunity } from '@/src/graphql/mutations';
import { signUpSchema } from './signUpValidation';

const client = generateClient({});

// External function to handle form submission
export const submitSignUpForm = async (
  parameters: any,
  clientInput: any,
  nextStep: any,
  handlers: any
) => {
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
        selectedCommunity: parameters.selectedCommunity,
        postalCode: '',
      };

      await clientInput.graphql({
        query: createUser,
        variables: {
          input: createUserInput,
        },
      });

      await clientInput.graphql({
        query: createUserCommunity,
        variables: {
          input: {
            communityId: '17b85438-7fcf-4f78-b5ef-cee07c6dedae',
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
      await submitSignUpForm(parameters, client, nextStep, handlers);
    },
  });

  const handleNext = async () => {
    //Define fields to validate for each step
    const stepFields: { [key: number]: string[] } = {
      0: ['email', 'password', 'confirmPassword'], // Fields for step 1
      1: ['address'], // Fields for step 2
      2: ['selectedCommunity'], // Fields for step 2
    };

    // Identify fields for the current step
    const currentStepFields = stepFields[active] || [];

    // Trigger validation only for the current step's fields
    const errors = await formik.validateForm();
    const isCurrentStepValid = currentStepFields.every(
      (field) => !errors[field as keyof typeof errors]
    );
    console.log('isCurrentStepValid:', isCurrentStepValid);
    if (isCurrentStepValid) {
      nextStep();
    } else {
      //Mark only the current step's fields as touched to show errors
      const touchedFields = currentStepFields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      );
      formik.setTouched(touchedFields);
    }
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
    }
    handlers.close();
  };

  const handleBack = () => (active === 0 ? router.push('/') : prevStep());

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
                selectedCommunityId={formik.values.selectedCommunity}
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
            <Button
              radius="md"
              loading={loading}
              onClick={() => {
                // Identify fields for the current step
                const currentStepFields = [
                  'firstName',
                  'familyName',
                  'preferredUsername',
                  'phoneNumber',
                ];

                // Trigger validation only for the current step's fields
                const errors = formik.validateForm();
                const isCurrentStepValid = currentStepFields.every(
                  (field) => !errors[field as keyof typeof errors]
                );
                console.log('isCurrentStepValid:', isCurrentStepValid);
                if (isCurrentStepValid) {
                  formik.submitForm();
                } else {
                  //Mark only the current step's fields as touched to show errors
                  const touchedFields = currentStepFields.reduce(
                    (acc, field) => ({ ...acc, [field]: true }),
                    {}
                  );
                  formik.setTouched(touchedFields);
                }
              }}
            >
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
