import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HomePage from '@/components/Home/HomePage';
import { DataProvider } from '@/contexts/DataContext';
import { Visibility } from '@/src/API';

const mockData = {
  posts: [
    {
      id: '1',
      content: 'This is a test post!',
      author: {
        firstName: 'Bojangle',
        lastName: 'Williams',
      },
      comments: { items: [] },
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

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: jest.fn().mockImplementation(() => ({
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {
      author: {
        firstName: 'John',
        lastName: 'Doe',
      },
      content: '',
      visibility: Visibility.PUBLIC,
    },
    errors: {},
    touched: {},
    validateForm: jest.fn().mockResolvedValue({
      content: 'Content is required',
    }),
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn(),
    getFieldProps: jest.fn().mockImplementation(() => ({
      //name,
      //value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    })),
    submitForm: jest.fn(),
    resetForm: jest.fn(),
  })),
}));

jest.mock('@/src/hooks/postsCustomHooks', () => ({
  useFetchPosts: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreatePost: jest.fn(() => ({
    createPost: jest.fn(),
  })),
  useCreateComment: jest.fn(() => ({
    createComment: jest.fn(),
  })),
  usePostLikes: jest.fn(() => ({
    likePost: jest.fn(),
    unlikePost: jest.fn(),
  })),
  useUserLikes: jest.fn(() => ({
    userLikes: {
      get: () => false,
    },
  })),
}));

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <HomePage />
      </DataProvider>
    </MantineProvider>
  );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Home page - Create Post', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  //1.1
  test('Renders the create post button correctly', async () => {
    renderComponent();
    expect(screen.getByText(/New Post.../i)).toBeInTheDocument();
  });

  //1.2
  test('Render post drawer when button is clicked', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Post.../i));
    expect(screen.getByTestId(/create-post-drawer/i)).toBeInTheDocument();
  });

  //1.3
  test('Render post drawer with the correct fields', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Post.../i));
    await waitFor(() => {
      expect(screen.getByTestId(/new-post/i)).toBeInTheDocument();
      expect(screen.getByTestId(/post-content/i)).toBeInTheDocument();
    });
  });

  //1.4
  test('Drawer fields are selectable and change to proper inputted values', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Post.../i));

    await waitFor(() => {
      expect(screen.getByTestId('post-content')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByTestId('post-content'), 'This is a test post');

    await waitFor(
      () => {
        expect(screen.getByTestId('post-content')).toHaveValue('This is a test post');
      },
      { timeout: 2000 }
    );
  });

  //1.5
  test('Drawer does not close if post-content is missing', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Post.../i));

    userEvent.type(screen.getByTestId('post-content'), 'This is a test post');

    await userEvent.click(screen.getByTestId('post-button'));

    await waitFor(
      () => {
        expect(screen.queryByTestId('post-content')).toBeInTheDocument();
        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      { timeout: 2000 }
    );
  });

  //1.6
  test('Drawer does not close if post-content is too short', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Post.../i));

    userEvent.type(screen.getByTestId(/post-content/i), 'Hi');

    await userEvent.click(screen.getByTestId(/post-button/i));

    await waitFor(
      () => {
        expect(screen.queryByTestId(/post-content/i)).toBeInTheDocument();

        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      {
        timeout: 2000,
      }
    );
  });
});
