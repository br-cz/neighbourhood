'use client';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, Text, Stepper, Checkbox, Image, Paper } from '@mantine/core';
import React, { useState, useEffect } from 'react';
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

interface Item {
  id: number;
  title: string;
  image: string;
}

interface ItemListProps {
  items: Item[];
}

function ItemList({ items }: ItemListProps) {
  //For navigation
  const router = useRouter();

  //Animated text
  const headerText = "Now, let's select some communities.";

  //Form to handle postal code inputs
  const form = useForm({
    initialValues: {
      postalCode: '',
    },

    //Validations, have to rewrite this later
  });

  const { active, nextStep, prevStep, setActive } = useStepperState(2);

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
        <Text fz="3rem" fw={600} lts={-0.02} ta={'center'} mt="xl" mb="xl">
          <AnimatedText
            text={headerText}
            classNameForPeriod={classes.blinkingPeriod}
            classNameForText={classes.animatedText}
          />
        </Text>

        {items.map((item) => (
          <Paper
            maw={840}
            mx="auto"
            w={840}
            withBorder
            shadow="sm"
            p="md"
            key={item.id}
            style={{ marginBottom: 10 }}
          >
            <Group>
              <Image src={item.image} width={100} height={100} alt={item.title} />
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <Checkbox />
            </Group>
          </Paper>
        ))}

        <Group grow gap="40%" mt="xs" pb="lg" maw={840} w={840}>
          <Button
            variant="gradient"
            gradient={{ from: 'grape', to: 'blue', deg: 90 }}
            onClick={() => {
              prevStep();
              router.push(stepToPath[1]);
            }}
          >
            Back
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'grape', to: 'blue', deg: 90 }}
            onClick={() => {
              //   nextStep();
              //   router.push(stepToPath[2]);
              // Take them to the home page
            }}
          >
            Submit
          </Button>
        </Group>
      </div>
    </>
  );
}

//for testing purposes
const items = [
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  {
    id: 1,
    title: 'Game of Thrones Dragon?',
    image:
      'https://mythicalcreatures.blog/wp-content/uploads/2023/09/Drogon-Dragon-from-Game-of-Thrones-768x428.webp',
  },
  {
    id: 2,
    title: 'Or maybe this one?',
    image:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfxxbvm-ebbe2112-0039-4af4-a168-fa27e71f27bb.png/v1/fill/w_1095,h_730,q_70,strp/drogon_s_den__a_gleam_in_the_gloom_by_odysseyorigins_dfxxbvm-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MDM5N2IxLTNjMjEtNDE1MC05YjVlLTQxNTljMjY0ODZhNFwvZGZ4eGJ2bS1lYmJlMjExMi0wMDM5LTRhZjQtYTE2OC1mYTI3ZTcxZjI3YmIucG5nIiwiaGVpZ2h0IjoiPD04NTQiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTRcL29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.LalzGj2Ig1c5mUdv-zaG5kJyqDQ-FAuhBLvNsF5ocpU',
  },
  // ... more items
];

function App() {
  return <ItemList items={items} />;
}

export default App;
