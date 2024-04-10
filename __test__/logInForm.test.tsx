import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import LoginForm from '../src/components/Authorization/LoginForm/LoginForm';

const mockedSignIn = require('@aws-amplify/auth').signIn;

const renderComponent = () =>
  render(
    <MantineProvider>
      <LoginForm />
    </MantineProvider>
  );

describe('LoginForm', () => {
  test('verifies that the landing login page renders correctly', async () => {
    renderComponent();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  test('verifies that the login page fields can be selected and changed', async () => {
    renderComponent();
    await userEvent.type(screen.getByLabelText(/Email/i), 'user@email.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('user@email.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('password');
  });

  test('tries to log-in a non-existent user and displays an error message', async () => {
    mockedSignIn.mockRejectedValue(new Error('User does not exist'));
    renderComponent();
    await userEvent.type(screen.getByLabelText(/Email/i), 'nonexistent@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'wrongpassword');
    await userEvent.click(screen.getByText(/Log In/i));
    const errorMessage = await screen.findByText(/Oops! Check your details and try again\./i);
    expect(mockedSignIn).toHaveBeenCalledWith({
      username: 'nonexistent@example.com',
      password: 'wrongpassword',
    });
    expect(errorMessage).toBeInTheDocument();
  });
});
