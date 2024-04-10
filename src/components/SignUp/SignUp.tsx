'import client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { confirmSignUp } from 'aws-amplify/auth';
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
import { useFormik } from 'formik';
import { LoginDetails } from '@/src/components/SignUp/LoginDetails.tsx';
import { AddressInput } from './AddressInput';
import { SelectCommunity } from './SelectCommunity';
import { ProfileSetup } from './ProfileSetup';
import { EmailVerify } from './EmailVerify';
import { signUpSchema } from './signUpValidation';
import { processSignUp } from './signUpLogic';
import { storeImage } from '../utils/s3Helpers/UserProfilePictureS3Helper';
import { handleSignIn } from '@/src/utils/authUtils';

export const SignUp = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [active, setActive] = useState(0);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [isLoading, handlers] = useDisclosure(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      selectedCommunity: '',
      preferredUsername: '',
      firstName: '',
      familyName: '',
      contact: '',
      bio: '',
      pronouns: '',
      profilePic: null,
      birthday: '',
      kids: 0,
      pets: 0,
      relevantCommunities: [],
    },
    validationSchema: signUpSchema,
    onSubmit: async (parameters) => {
      const response = await processSignUp(parameters, nextStep, handlers);
      if (response && response.userId) {
        setUserId(response.userId);
      }
    },
  });

  const handleValidate = async (step: number): Promise<boolean> => {
    const stepFields: { [key: number]: string[] } = {
      0: ['email', 'password', 'confirmPassword'],
      1: ['address'],
      2: ['selectedCommunity'],
      3: [
        'firstName',
        'familyName',
        'preferredUsername',
        'bio',
        'contact',
        'profilePic',
        'kids',
        'pets',
        'birthday',
      ],
    };
    const currentStepFields = stepFields[step] || [];
    const errors = await formik.validateForm();
    formik.setTouched(currentStepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    return currentStepFields.every((field) => !errors[field as keyof typeof formik.values]);
  };

  const handleAddressSelection = (isSelected: boolean) => {
    setIsAddressValid(isSelected);
  };

  const handleCoordinatesChange = (newCoordinates: any) => {
    setCoordinates(newCoordinates);
  };

  const handleNext = async () => {
    const isValid = await handleValidate(active);

    if (active === 1 && !isAddressValid) {
      notifications.show({
        title: 'Oops!',
        message:
          'You must select an address from the dropdown list. Please select an address and proceed.',
        color: 'red',
      });
      return;
    }
    if (isValid) {
      nextStep();
    } else {
      notifications.show({
        title: 'Oops!',
        message: 'Please double-check your inputs and try again.',
        color: 'red',
      });
    }
  };

  const handleSubmit = async () => {
    const isValid = await handleValidate(active);
    if (isValid) {
      formik.submitForm();
    } else {
      notifications.show({
        title: 'Oops!',
        message: 'Please double-check your inputs and try again.',
        color: 'red',
      });
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
    handlers.open();
    try {
      await confirmSignUp({
        username: formik.values.email,
        confirmationCode: verificationCode,
      });
      const username = formik.values.email;
      const { password } = formik.values;

      if (formik.values.profilePic && userId) {
        await storeImage(formik.values.profilePic, userId);
      }
      await handleSignIn({
        username,
        password,
        router,
        firstLogin: true,
        firstName: formik.values.firstName,
        handlers,
        setErrorMessage: (message) => console.error(message),
      });
    } catch (error) {
      console.error('Verification Error:', error);
      notifications.show({
        title: 'Verification Error',
        message: 'Failed to verify email. Please contact an administrator.',
        color: 'red',
      });
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
        <Stepper
          active={active}
          size="md"
          onStepClick={setActive}
          allowNextStepsSelect={false}
          data-testid="stepper"
        >
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
                setFieldValue={formik.setFieldValue}
                onAddressSelection={handleAddressSelection}
                onCoordinatesChange={handleCoordinatesChange}
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
                coordinates={coordinates}
                selectedCommunity={formik.values.selectedCommunity}
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
                bio={formik.values.bio}
                contact={formik.values.contact}
                pronouns={formik.values.pronouns}
                birthday={formik.values.birthday}
                kids={formik.values.kids}
                pets={formik.values.pets}
                profilePic={formik.values.profilePic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                setFieldValue={formik.setFieldValue}
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
                We&apos;ve sent a verification code to your email at{' '}
                <u>{formik.values.email.toLowerCase()}</u>
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
            <Button radius="md" loading={isLoading} onClick={confirmSubmit}>
              Create Profile
            </Button>
          ) : active === 4 ? (
            <Button radius="md" loading={isLoading} onClick={handleVerify}>
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
