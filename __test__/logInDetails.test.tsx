import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/Authorization/loginForm.client';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  const mockedSignIn = require('aws-amplify/auth').signIn;

  //Not necessary in this case, but could have been useful if we had like multiple test where
  //all of them needed to mock the same function but with different return values

  // beforeEach(() => {
  //   // Reset mocks before each test
  //   mockedSignIn.mockClear();
  //   jest.
  // });

  test('tries to log-in a non-existent user and displays an error message', async () => {
    //mockedSignIn.mockResolvedValue(true);

    // Mock signIn to simulate a failed login attempt returned by the backend
    mockedSignIn.mockRejectedValue(new Error('User does not exist'));

    const { getByLabelText, getByText, findByText } = render(
      <MantineProvider>
        <LoginForm />
      </MantineProvider>
    );

    // Simulate user input
    await userEvent.type(getByLabelText(/Email/i), 'nonexistent@example.com');
    await userEvent.type(getByLabelText(/Password/i), 'wrongpassword');

    // Simulate form submission
    userEvent.click(getByText(/Log In/i));

    // Wait for the error message to appear
    const errorMessage = await findByText(/Oops! Check your details and try again\./i);

    // Assertions
    // Verify signIn was called with provided credentials
    expect(mockedSignIn).toHaveBeenCalledWith({
      username: 'nonexistent@example.com',
      password: 'wrongpassword',
    });

    // Verify the error message is displayed
    expect(errorMessage).toBeInTheDocument();
  });
});
