"use client";
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Flex, PasswordInput } from '@mantine/core';
import {useNavigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom';


export function Welcome() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      passwordInput: '',
    },
  });

  const handleLogin = () => {
    const { email, passwordInput } = form.values;
    //Backend logic here to authenticate user
  }

  const handleSignUp = () => {
    navigate('/SignUp');
  }

  const containerStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }

  

  return (
    <div style={containerStyling}>
    <Box maw={540} mx="auto" w={440}>
      <img src="/logo.svg" alt="Neighbourhood Logo"/>
      <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} mt="xl"/>
      <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('passwordInput')} />

      <Group justify="center" mt="md" gap="xl" grow>
        <Button 
          variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 140 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant= "gradient"
          gradient= {{ from: 'grape', to: 'blue', deg: 90 }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Group>
    </Box>
  </div>
  );
}