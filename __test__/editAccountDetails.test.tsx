/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import { notifications } from '@mantine/notifications';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import { DataProvider } from '@/contexts/DataContext';

const Auth = require('@aws-amplify/auth');
const UserAPI = require('@/src/api/services/user');
const UserHooks = require('@/src/hooks/usersCustomHooks');

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
    await userEvent.click(screen.getByTestId('open-settings-btn'));
    expect(screen.getByTestId('account-settings-modal')).toBeInTheDocument();
  });

  // Test case 2: Allows the user to change their password
  test('Allows the user to change their password', async () => {
    renderComponent();
    await userEvent.click(screen.getByTestId('open-settings-btn'));

    UserHooks.getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    await waitFor(() => {
      expect(screen.getByTestId('old-password-input')).toBeInTheDocument();
    });
    await userEvent.type(screen.getByTestId('old-password-input'), 'oldPassword');
    await userEvent.type(screen.getByTestId('new-password-input'), 'newPassword');
    await userEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(Auth.updatePassword).toHaveBeenCalledWith({
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      });
    });

    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Your password has been updated!',
      })
    );
  });

  // Test case 3: Allows the user to change their email
  test('Allows the user to change their email', async () => {
    renderComponent();
    await userEvent.click(screen.getByTestId('open-settings-btn'));

    UserHooks.getCurrentUser.mockResolvedValue({
      id: 'userId',
      email: 'user@example.com',
      _version: 1,
    });

    const updateUserEmailMock = UserAPI.updateUserEmailAPI;
    updateUserEmailMock.mockResolvedValue(true);

    const updateUserAttributesMock = Auth.updateUserAttributes;
    updateUserAttributesMock.mockResolvedValue(true);

    // Simulate typing a new email
    await waitFor(() => {
      expect(screen.getByTestId('new-email-input')).toBeInTheDocument();
    });
    await userEvent.type(screen.getByTestId('old-password-input'), 'oldPassword');
    await userEvent.type(screen.getByTestId('new-email-input'), 'newuser@example.com');
    await userEvent.click(screen.getByTestId('submit-btn'));

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
