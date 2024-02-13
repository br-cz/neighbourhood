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

export default function Address() {
  //Obsolete, useNavigate is not used anymore
  const navigate = useNavigate();

  //For navigation
  const router = useRouter();

  //Animated text
  const headerText = 'What is your postal code?';

  //Form to handle postal code inputs
  const form = useForm({
    initialValues: {
      postalCode: '',
    },

    //Validations, have to rewrite this later
  });

  const { active, nextStep, prevStep, setActive } = useStepperState(1);

  const handleStepClick = (step: number) => {
    setActive(step);
    router.push(stepToPath[step]);
  };

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

      <div className={classes.addressModalStyling}>
        <Text fz="3rem" fw={600} lts={-0.02} ta={'left'} mt={'15vh'}>
          <AnimatedText
            text={headerText}
            classNameForPeriod={classes.blinkingPeriod}
            classNameForText={classes.animatedText}
          />
        </Text>

        <Box maw={540} mx="auto" w={440}>
          <TextInput
            label="Postal Code"
            placeholder="Postal Code"
            {...form.getInputProps('postalCode')}
          />
          <Group justify="flex-end" mt="xl" grow>
            <Button
              variant="gradient"
              gradient={{ from: 'grape', to: 'blue', deg: 90 }}
              onClick={() => {
                prevStep();
                router.push(stepToPath[0]);
              }}
            >
              Back
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'grape', to: 'blue', deg: 90 }}
              onClick={() => {
                nextStep();
                router.push(stepToPath[2]);
              }}
            >
              Next step{' '}
            </Button>
          </Group>
        </Box>
      </div>
    </>
  );
}
