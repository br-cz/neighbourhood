import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import { MantineProvider } from '@mantine/core';
import { DataProvider } from '@/contexts/DataContext';

// Test cases for the ProfilePage component
describe('ProfilePage - Change Password', () => {
  jest.mock('@aws-amplify/auth', () => ({
    Auth: {
      configure: jest.fn(),
      updatePassword: jest.fn(() => Promise.resolve()),
      updateUserAttributes: jest.fn(() => Promise.resolve()),
      // Add other methods you use and want to mock
    },
  }));
  // Test case 1: Allows the user to change their password
  test('Allows the user to change their password', async () => {
    const { getByLabelText, getByText } = render(
      <MantineProvider>
        <DataProvider>
          <ProfilePage />
        </DataProvider>
      </MantineProvider>
    );

    require('@/src/hooks/usersCustomHooks').getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    await userEvent.type(getByLabelText(/Old Password/i), 'oldPassword');
    await userEvent.type(getByLabelText(/New Password/i), 'newPassword');
    await userEvent.click(getByText(/Submit Changes/i));

    await waitFor(() => {
      expect(require('aws-amplify/auth').updatePassword).toHaveBeenCalledWith({
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      });
    });

    expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Your login details have been updated!',
      })
    );
  });

  // Test case 2: Allows the user to change their email
  test('Allows the user to change their email', async () => {
    const { getByLabelText, getByText } = render(
      <MantineProvider>
        <DataProvider>
          <ProfilePage />
        </DataProvider>
      </MantineProvider>
    );

    require('@/src/hooks/usersCustomHooks').getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    const updateUserEmailMock = require('@/src/api/services/user').updateUserEmail;
    updateUserEmailMock.mockResolvedValue(true);

    const updateUserAttributesMock = require('aws-amplify/auth').updateUserAttributes;
    updateUserAttributesMock.mockResolvedValue(true);

    // Simulate typing a new email
    await userEvent.type(getByLabelText(/New Email/i), 'newuser@example.com');
    await userEvent.click(getByText(/Submit Changes/i));

    await waitFor(() => {
      expect(updateUserAttributesMock).toHaveBeenCalledWith({
        userAttributes: {
          email: 'newuser@example.com',
        },
      });

      expect(updateUserEmailMock).toHaveBeenCalledWith('userId', 'newuser@example.com', 1);
    });
  });
});
