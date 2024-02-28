import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import { MantineProvider } from '@mantine/core';
import { DataProvider } from '@/contexts/DataContext';

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <ProfilePage />
      </DataProvider>
    </MantineProvider>
  );

// Test cases for the ProfilePage component
describe('ProfilePage - Change Password', () => {
  jest.mock('@aws-amplify/auth', () => ({
    Auth: {
      configure: jest.fn(),
      updatePassword: jest.fn(() => Promise.resolve()),
      updateUserAttributes: jest.fn(() => Promise.resolve()),
    },
  }));

  // Test case 1: Renders the Account Detail Page
  test('Renders Account Detail Page', async () => {
    renderComponent();
    expect(screen.getByText(/Edit Login Details/i)).toBeInTheDocument();
  });

  // Test case 2: Allows the user to change their password
  test('Allows the user to change their password', async () => {
    renderComponent();

    require('@/src/hooks/usersCustomHooks').getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    await userEvent.type(screen.getByLabelText(/Old Password/i), 'oldPassword');
    await userEvent.type(screen.getByLabelText(/New Password/i), 'newPassword');
    await userEvent.click(screen.getByText(/Submit Changes/i));

    await waitFor(() => {
      expect(require('@aws-amplify/auth').updatePassword).toHaveBeenCalledWith({
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

  // Test case 3: Allows the user to change their email
  test('Allows the user to change their email', async () => {
    renderComponent();

    require('@/src/hooks/usersCustomHooks').getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    const updateUserEmailMock = require('@/src/api/services/user').updateUserEmailAPI;
    updateUserEmailMock.mockResolvedValue(true);

    const updateUserAttributesMock = require('@aws-amplify/auth').updateUserAttributes;
    updateUserAttributesMock.mockResolvedValue(true);

    // Simulate typing a new email
    await userEvent.type(screen.getByLabelText(/New Email/i), 'newuser@example.com');
    await userEvent.click(screen.getByText(/Submit Changes/i));

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
