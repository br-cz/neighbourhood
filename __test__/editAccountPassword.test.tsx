import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import { MantineProvider } from '@mantine/core';
import { DataProvider } from '@/contexts/DataContext';

// // Test case
// describe('ProfilePage - Change Password', () => {
//   it('allows the user to change their password', async () => {
//     const { getByLabelText, getByText } = render(
//       <MantineProvider>
//         <ProfilePage />
//       </MantineProvider>
//     );

//     // The rest of your test code
//   });
// });

// Mock external dependencies
jest.mock('@/components/Authorization/useAuth', () => ({
  useAuth: () => ({ user: { loggedIn: true } }),
}));

jest.mock('aws-amplify/auth', () => ({
  updateUserAttributes: jest.fn(),
  updatePassword: jest.fn().mockResolvedValue(true),
}));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/mocked-path'),
}));

jest.mock('@/src/api/appQueries', () => ({
  getCurrentUser: jest.fn(),
  useCurrentUser: jest.fn(() => ({
    user: {
      id: 'user1',
      username: 'testUser',
      email: 'test@example.com',
      postalCode: '12345',
      firstName: 'Test',
      lastName: 'User',
      selectedCommunity: 'communityId',
      location: 'Test Location',
      // age: 30,
      // bio: 'This is a test bio.',
      // profilePic: 'path/to/profilePic.jpg',
      // pets: 1,
      // kids: 2,
      // Add other fields as necessary
    },
  })),
  useCurrentCommunity: jest.fn(() => ({
    community: {
      id: 'community1',
      name: 'Test Community',
      location: 'Test Location',
      // coordinates: '123, 456',
      image: 'path/to/communityImage.jpg',
    },
  })),
}));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/mocked-path'),
}));

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

    userEvent.type(getByLabelText(/Old Password/i), 'oldPassword');
    userEvent.type(getByLabelText(/New Password/i), 'newPassword');
    userEvent.click(getByText(/Submit Changes/i));

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
