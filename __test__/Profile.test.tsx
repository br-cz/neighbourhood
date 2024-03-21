/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import ProfilePage from '@/components/Profile/ProfilePage';

const mockData = {
  currentUser: {
    id: '1',
    firstName: 'Bojangle',
    lastName: 'Williams',
    bio: 'I am a test user!',
    contact: '(204) 456-7890',
    address: '123 Test St.',
    createdAt: '2023-05-12T19:00:00',
    profilePic: 'https://i.pinimg.com/474x/b9/c1/88/b9c188de7d5e572dd57d5e4e291df7f5.jpg',
    pets: 2,
    kids: 3,
    pronouns: 'He/Him',
    birthday: '1990-05-12',
  },
};

jest.mock('@/src/hooks/usersCustomHooks', () => ({
  useCurrentUser: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <ProfilePage />
      </DataProvider>
    </MantineProvider>
  );

describe('Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial Profile page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'My Public Profile' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the Profile Card correctly with the correct information', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Bojangle Williams')[0]).toBeInTheDocument();
      expect(screen.getByText('I am a test user!')).toBeInTheDocument();
      expect(screen.getByText('(204) 456-7890')).toBeInTheDocument();
      expect(screen.getByText('123 Test St.')).toBeInTheDocument();
      expect(screen.getByText('May 12, 1990 (33 years)')).toBeInTheDocument();
      expect(screen.getByText('He/Him')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});
