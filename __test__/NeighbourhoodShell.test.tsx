/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { modals } from '@mantine/modals';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { notifications } from '@mantine/notifications';
import { signOut } from 'aws-amplify/auth';
import { NextRouter } from 'next/router';
import { DataProvider } from '@/contexts/DataContext';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { utilSignOut } from '@/utils/signOutUtils';
import AppPage from '@/app/neighbourhood/page';

const mockLikePost = jest.fn();
const mockUnlikePost = jest.fn();
const mockHandleCreateComment = jest.fn();

const mockData = {
  posts: [
    {
      id: '1',
      content: 'This is a test post!',
      author: {
        firstName: 'Bojangle',
        lastName: 'Williams',
      },
      comments: {
        items: [
          {
            id: 'comment1',
            content: 'This is the first comment',
            author: { id: 'author1', firstName: 'Commenter', lastName: 'One' },
          },
          {
            id: 'comment2',
            content: 'This is the second comment',
            author: { id: 'author2', firstName: 'Commenter', lastName: 'Two' },
          },
        ],
      },
      isLiked: false,
    },
    {
      id: '2',
      content: 'This is a second test post post!',
      author: {
        firstName: 'Grunkle',
        lastName: 'Williams',
      },
      comments: { items: [] },
      isLiked: false,
    },
    {
      id: '3',
      content: 'This is a third test post!',
      author: {
        firstName: 'LeJon',
        lastName: 'Brames',
      },
      comments: { items: [] },
      isLiked: false,
    },
  ],
};

jest.mock('@/src/hooks/postsCustomHooks', () => ({
  useFetchPosts: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreatePost: jest.fn(() => ({
    createPost: jest.fn(),
  })),
  useDeletePost: jest.fn(() => ({
    handleDeletePost: jest.fn(),
  })),
  usePostLikes: jest.fn(() => ({
    likePost: mockLikePost,
    unlikePost: mockUnlikePost,
  })),
  useUserLikes: jest.fn(() => ({
    userLikes: {
      get: () => false,
    },
  })),
  useCreateComment: jest.fn(() => ({
    handleCreateComment: mockHandleCreateComment.mockImplementation(async (commentData) => ({
      ...commentData,
      id: 'newComment',
      createdAt: new Date().toISOString(),
    })),
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
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
        <AppPage />
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
      expect(screen.getByTestId('current-user-info')).toBeInTheDocument();
    });
  });

  //1.6
  test('Communities button is rendered with the correct info', async () => {
    renderComponent();
    await waitFor(() => {
      console.log(useCurrentUser());
      expect(screen.getByText('My Community')).toBeInTheDocument();
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
  test('utilSignOut should sign out the user, clear localStorage, navigate to home, and show a notification', async () => {
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
