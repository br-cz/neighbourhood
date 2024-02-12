"use client";
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, Text, Stepper, PasswordInput } from '@mantine/core';
import React, { useState, useEffect} from 'react';
import classes from './SignUp.module.css';
import {useNavigate} from 'react-router-dom';

export function SignUp() {
    const navigate = useNavigate();
    const [words, setWords] = useState<string[]>([]);

    const headerText = "Let's start with the basics";


    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    const handleAddress = () => {
        navigate('/ProvideAddress');
      }

    useEffect(() => {
        const headerWords = headerText.split("");
        headerWords.forEach((word, index) => {
            setTimeout(() => {
              setWords((words) => [...words, word]);
            }, 50 * index);
          });
        
          setTimeout(() => {
            setWords((words) => [...words, '.']);
          }, 55 * headerWords.length);
        }, []);
  
  
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
     <Stepper active={active} onStepClick={setActive} color="blue" mt="xl" ml={"xs"} mr={"xs"}>
        <Stepper.Step label="First step" description="Create an account">
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Provide Address">
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Select Communities">
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

    <div className={classes.containerStyling}>

    <Text
     fz="3rem"
     fw={600}
     lts={-0.02}
     ta={"left"}
     mt={"xl"}
     >
     {words.map((word, index) => (
        <span key={index} className={word === '.' ? classes.blinkingPeriod : classes.animatedText}>
              {word === " " ? "\u00A0" : word}
        </span>
        ))}
    </Text>

    
    
    <Box component="form" maw={540} mx="auto" w={440} onSubmit={form.onSubmit(() => {})}>
      <TextInput label="Username" placeholder="Username" withAsterisk {...form.getInputProps('username')} />
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
        <Button variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 90 }} onClick={prevStep}>Back</Button>
        <Button variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 90 }} onClick={ () => {nextStep(); handleAddress()}}>Next step</Button>
      </Group>

    </Box>
    </div>
    </>
  );
}

//<Group justify="flex-end" mt="md">
//<Button variant= "gradient"
//gradient= {{ from: 'grape', to: 'blue', deg: 90 }}
//type="submit">Submit</Button>
//</Group>