import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import { MantineProvider } from '@mantine/core';
import { DataProvider } from '@/contexts/DataContext';

// Test case
describe('ProfilePage - Change Password', () => {
  it('allows the user to change their password', async () => {
    const { getByLabelText, getByText } = render(
      <MantineProvider>
        <DataProvider>
          <ProfilePage />
        </DataProvider>
      </MantineProvider>
    );

    require('@/src/api/appQueries').getCurrentUser.mockResolvedValue({
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
});
