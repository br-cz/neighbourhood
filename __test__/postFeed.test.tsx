/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import HomePage from '@/app/home/page';

const AppQueries = require('@/src/api/appQueries');

const mockData = {
  posts: [
    {
      id: '1',
      content: 'This is a test post!',
      author: {
        firstName: 'Bojangle',
        lastName: 'Williams',
      },
    },
    {
      id: '2',
      content: 'This is a second test post post!',
      author: {
        firstName: 'Grunkle',
        lastName: 'Williams',
      },
    },
    {
      id: '3',
      content: 'This is a third test post!',
      author: {
        firstName: 'LeJon',
        lastName: 'Brames',
      },
    },
  ],
};

jest.mock('@/src/api/postQueries', () => ({
  useFetchPosts: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreatePost: jest.fn(() => ({
    createPost: jest.fn(),
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <HomePage />
      </DataProvider>
    </MantineProvider>
  );

describe('Feed Page', () => {
  AppQueries.getCurrentUser.mockResolvedValue({
    id: '10',
    email: 'user@email.com',
    _version: 1,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial Feed page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'Feed' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the Post feed component correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId('post-feed')).toBeInTheDocument();
    });
  });

  //1.3
  test('Renders an array of Post Cards correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('post-card').length).toBeGreaterThan(0);
    });
  });

  //1.4
  test('Renders an appropriate # of post cards to events in the community', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('post-card').length).toBe(mockData.posts.length);
    });
  });

  test('Renders event card content correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('This is a test post!')).toBeInTheDocument();
      expect(screen.getByText('Bojangle Williams')).toBeInTheDocument();
      expect(screen.getByText('This is a second test post post!')).toBeInTheDocument();
      expect(screen.getByText('Grunkle Williams')).toBeInTheDocument();
      expect(screen.getByText('This is a third test post!')).toBeInTheDocument();
      expect(screen.getByText('LeJon Brames')).toBeInTheDocument();
    });
  });
});
