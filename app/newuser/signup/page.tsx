'use client';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  Text,
  Stepper,
  PasswordInput,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/AnimatedText/AnimatedText';
import { useStepperState } from '@/components/StepperState/StepperState';
import { useRouter } from 'next/navigation';
//import signup.module.css from the components folder
import classes from '@/components/AnimatedText/signup.module.css';

//Helper functions to map steps to paths
type StepToPath = {
  [key: number]: string;
};

const stepToPath: StepToPath = {
  0: '/newuser/signup',
  1: '/newuser/address',
  2: '/newuser/communityselection',
};

export default function signup() {
  //Obsolete, useNavigate is not used anymore
  const navigate = useNavigate();

  //For navigation
  const router = useRouter();

  //Animated text
  const headerText = "Let's start with the basics.";

  const { active, nextStep, prevStep, setActive } = useStepperState(0);

  const handleStepClick = (step: number) => {
    setActive(step);
    router.push(stepToPath[step]);
  };

  //Form to handle user inputs
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    },

    //Validations, have to rewrite this later
    // validate: {
    //   name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
    //   job: isNotEmpty('Enter your current job'),
    //   email: isEmail('Invalid email'),
    //   favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/, 'Enter a valid hex color'),
    //   age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
    // },
  });

  return (
    <>
      <Stepper
        active={active}
        onStepClick={handleStepClick}
        color="blue"
        mt="xl"
        ml={'xs'}
        mr={'xs'}
      >
        <Stepper.Step label="First step" description="Create an account"></Stepper.Step>
        <Stepper.Step label="Second step" description="Provide Address"></Stepper.Step>
        <Stepper.Step label="Final step" description="Select Communities"></Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <div className={classes.containerStyling}>
        <Text fz="3rem" fw={600} lts={-0.02} ta={'left'} mt={'xl'}>
          <AnimatedText
            text={headerText}
            classNameForPeriod={classes.blinkingPeriod}
            classNameForText={classes.animatedText}
          />
        </Text>

        <Box component="form" maw={540} mx="auto" w={440} onSubmit={form.onSubmit(() => {})}>
          <TextInput
            label="Username"
            placeholder="Username"
            withAsterisk
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            withAsterisk
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            withAsterisk
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            withAsterisk
            mt="md"
            {...form.getInputProps('email')}
          />

          <Group justify="flex-end" mt="xl" grow>
            <Button
              disabled
              variant="gradient"
              gradient={{ from: 'grape', to: 'blue', deg: 90 }}
              onClick={() => {
                prevStep();
                router.push(stepToPath[-1]);
              }}
            >
              Back
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'grape', to: 'blue', deg: 90 }}
              onClick={() => {
                nextStep();
                router.push(stepToPath[1]);
              }}
            >
              Next step
            </Button>
          </Group>
        </Box>
      </div>
    </>
  );
}
