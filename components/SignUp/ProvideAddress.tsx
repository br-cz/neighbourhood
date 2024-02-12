import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Stepper, Text } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './SignUp.module.css';

export function Address() {
    const headerText = "What is your postal code";
    const [words, setWords] = useState<string[]>([]);

    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      postalCode: '',
      email: '',
    },
  });


  useEffect(() => {
    const headerWords = headerText.split("");
    headerWords.forEach((word, index) => {
        setTimeout(() => {
          setWords((words) => [...words, word]);
        }, 50 * index);
      });
    
      setTimeout(() => {
        setWords((words) => [...words, '?']);
      }, 55 * headerWords.length);
    }, []);


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

    <div className={classes.addressModalStyling}>

    <Text
     fz="3rem"
     fw={600}
     lts={-0.02}
     ta={"left"}
     mt={"15vh"}
     >
     {words.map((word, index) => (
        <span key={index} className={word === '?' ? classes.blinkingPeriod : classes.animatedText}>
              {word === " " ? "\u00A0" : word}
        </span>
        ))}
    </Text>


    <Box maw={540} mx="auto" w={440}>
      <TextInput label="Postal Code" placeholder="Postal Code" {...form.getInputProps('postalCode')} />
      <Group justify="flex-end" mt="xl" grow>
        <Button variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 90 }} onClick={prevStep}>Back</Button>
        <Button variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 90 }} onClick={ () => {nextStep();}}>Next step</Button>
      </Group>
    </Box>
    </div>
    </>
  );
}