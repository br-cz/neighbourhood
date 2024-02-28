/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { modals } from '@mantine/modals';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import CommunitiesPage from '@/app/communities/page';
import { useCurrentUser } from '@/src/api/appQueries';
import { utilSignOut } from '@/utils/signOutUtils';
import { notifications } from '@mantine/notifications';
import { signOut } from 'aws-amplify/auth';
import { NextRouter } from 'next/router';

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const routerMock: Partial<NextRouter> = {
  push: jest.fn(),
};

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <CommunitiesPage />
      </DataProvider>
    </MantineProvider>
  );

describe('Neighbourhood Shell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the Shell correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('shell')).toBeInTheDocument();
  });

  //1.2
  test('Renders the Header correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
  });

  //1.3
  test('Renders the Navbar correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  //1.4
  test('Renders the Navbar items correctly', async () => {
    renderComponent();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByTestId('community')).toBeInTheDocument();
  });

  //1.5
  test('Profile button is rendered with the correct info', async () => {
    renderComponent();
    await waitFor(() => {
      console.log(useCurrentUser());
      expect(screen.getByText('My Profile')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  //1.6
  test('Communities button is rendered with the correct info', async () => {
    renderComponent();
    await waitFor(() => {
      console.log(useCurrentUser());
      expect(screen.getByText('My Community')).toBeInTheDocument();
      expect(screen.getByText('Test Community')).toBeInTheDocument();
    });
  });

  //1.7
  test('Clicking the logout button presents a logout confirmation', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('logout'));
    await waitFor(() => {
      expect(modals.openConfirmModal).toHaveBeenCalled();
    });
  });

  //1.8
  it('utilSingOUt should ign out the user, clear localStorage, navigate to home, and show a notification', async () => {
    // Call the utility function with the mocked router
    await utilSignOut({ router: routerMock as NextRouter });

    // Assertions to ensure all expected actions were called
    expect(signOut).toHaveBeenCalledWith({ global: true });
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('currentUser');
    expect(routerMock.push).toHaveBeenCalledWith('/');
    expect(notifications.show).toHaveBeenCalledWith({
      radius: 'md',
      title: 'Logged out!',
      message: 'Log back in to continue using Neighborhood.',
    });
  });
});
