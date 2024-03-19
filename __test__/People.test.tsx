/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import PeoplePage from '@/components/People/PeoplePage';
import {
  useCreateFriend,
  useCreateFriendRequest,
  useDeleteFriend,
  useDeleteIncomingFriendRequest,
  useDeleteOutgoingFriendRequest,
} from '@/src/hooks/friendsCustomHooks';

const userHooks = require('@/src/hooks/usersCustomHooks');

const mockData = {
  friends: [
    {
      id: '1',
      firstName: 'Bojangle',
      lastName: 'Williams',
      username: 'bjwilliams',
      bio: 'I am a test user!',
      contact: '(204) 456-7890',
      address: '123 Test St.',
      birthday: '1990-05-12',
      pets: 2,
      kids: 3,
      pronouns: 'He/Him',
    },
    {
      id: '9',
      firstName: 'Duck',
      lastName: 'Swanson',
      username: 'dswanson',
    },
  ],
  incomingFriendRequests: [
    {
      id: '2',
      firstName: 'Grunkle',
      lastName: 'Williams',
      username: 'gkwilliams',
    },
  ],
  outgoingFriendRequests: [
    {
      id: '3',
      firstName: 'LeJon',
      lastName: 'Brames',
      username: 'kingbrames',
    },
  ],
  noneFriends: [
    {
      id: '4',
      firstName: 'Bobby',
      lastName: 'Biggs',
      username: 'bigrobert',
      contact: '(204) 999-9999',
      address: '999 Test St.',
      birthday: '1980-05-12',
      pets: 4,
      kids: 1,
      pronouns: 'They/Them',
      bio: 'I am a test user also!',
    },
    {
      id: '5',
      firstName: 'Daniel',
      lastName: 'Long',
      username: 'dlong',
    },
  ],
};

jest.mock('@/src/hooks/friendsCustomHooks', () => ({
  useFetchCommunityMembers: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreateFriend: jest.fn(() => ({
    handleCreateFriend: jest.fn(),
    error: null,
  })),
  useCreateFriendRequest: jest.fn(() => ({
    handleCreateFriendRequest: jest.fn(),
    error: null,
  })),
  useDeleteFriend: jest.fn(() => ({
    handleDeleteFriend: jest.fn(),
    error: null,
  })),
  useDeleteIncomingFriendRequest: jest.fn(() => ({
    handleDeleteIncomingFriendRequest: jest.fn(),
    error: null,
  })),
  useDeleteOutgoingFriendRequest: jest.fn(() => ({
    handleDeleteOutgoingFriendRequest: jest.fn(),
    error: null,
  })),
}));

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <PeoplePage />
      </DataProvider>
    </MantineProvider>
  );

describe('People Page', () => {
  const numFriendCards = mockData.friends.length * 2; // Once in the all tab and once in the friends tab
  const numIncomingRequestCards = mockData.incomingFriendRequests.length * 2; // Once in the all tab and once in the requests tab
  const numOutgoingRequestCards = mockData.outgoingFriendRequests.length;
  const numRegularCards = mockData.noneFriends.length;
  const expectedUserCards =
    numFriendCards + numIncomingRequestCards + numOutgoingRequestCards + numRegularCards;

  userHooks.getCurrentUser.mockResolvedValue({
    id: '10',
    email: 'user@email.com',
    friends: [],
    _version: 1,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial People page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'People' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the user list correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
    });
  });

  //1.3
  test('Renders a list of user items correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('user-item').length).toBeGreaterThan(0);
    });
  });

  //1.4
  test('Renders an appropriate # of user cards to members in the community', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('user-item').length).toBe(expectedUserCards);
    });
  });

  //1.5
  test('Renders user friends correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Bojangle Williams').length).toBe(2);
      expect(screen.getAllByText('bjwilliams').length).toBe(2);
      expect(screen.getAllByTestId('friends-btn').length).toBe(numFriendCards);
    });
  });

  //1.6
  test('Renders incoming friend requests correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Grunkle Williams').length).toBe(numIncomingRequestCards);
      expect(screen.getAllByText('gkwilliams').length).toBe(numIncomingRequestCards);
      expect(screen.getAllByTestId('accept-request-btn').length).toBe(numIncomingRequestCards);
      expect(screen.getAllByTestId('decline-request-btn').length).toBe(numIncomingRequestCards);
    });
  });

  //1.7
  test('Renders outgoing friend requests correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('LeJon Brames')).toBeInTheDocument();
      expect(screen.getByText('kingbrames')).toBeInTheDocument();
      expect(screen.getAllByTestId('outgoing-request-btn').length).toBe(numOutgoingRequestCards);
    });
  });

  //1.8
  test('Renders regular members (no relation to user) correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Bobby Biggs')).toBeInTheDocument();
      expect(screen.getByText('bigrobert')).toBeInTheDocument();
      expect(screen.getByText('Daniel Long')).toBeInTheDocument();
      expect(screen.getByText('dlong')).toBeInTheDocument();
      expect(screen.getAllByTestId('add-friend-btn').length).toBe(numRegularCards);
    });
  });

  //1.9
  test('Clicks the add friend button and sends friend requests correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('add-friend-btn').length).toBe(numRegularCards);
    });
    fireEvent.click(screen.getAllByTestId('add-friend-btn')[0]);
    await waitFor(() => {
      expect(useCreateFriendRequest).toHaveBeenCalled();
      expect(screen.getAllByTestId('outgoing-request-btn').length).toBe(
        numOutgoingRequestCards + 1
      );
    });
  });

  //1.10
  test('Cancels an outgoing friend request correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('outgoing-request-btn').length).toBe(numOutgoingRequestCards);
    });
    fireEvent.click(screen.getAllByTestId('outgoing-request-btn')[0]);
    await waitFor(() => {
      expect(useDeleteOutgoingFriendRequest).toHaveBeenCalled();
      expect(screen.queryByTestId('outgoing-request-btn')).toBeNull();
    });
  });

  //1.11
  test('Declines an incoming friend request correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('decline-request-btn').length).toBe(numIncomingRequestCards);
    });
    fireEvent.click(screen.getAllByTestId('decline-request-btn')[0]);
    await waitFor(() => {
      expect(useDeleteIncomingFriendRequest).toHaveBeenCalled();
      expect(screen.getAllByTestId('accept-request-btn').length).toBe(numIncomingRequestCards - 1);
      expect(screen.getAllByTestId('decline-request-btn').length).toBe(numIncomingRequestCards - 1);
    });
  });

  //1.12
  test('Accepts an incoming friend request correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('accept-request-btn').length).toBe(numIncomingRequestCards);
    });
    fireEvent.click(screen.getAllByTestId('accept-request-btn')[0]);
    await waitFor(() => {
      expect(useCreateFriend).toHaveBeenCalled();
      expect(screen.getAllByTestId('friends-btn').length).toBe(numFriendCards + 1);
    });
  });

  //1.13
  test('Removes a friend correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('friends-btn').length).toBe(numFriendCards);
    });
    fireEvent.click(screen.getAllByTestId('friends-btn')[0]);
    await waitFor(() => {
      expect(useDeleteFriend).toHaveBeenCalled();
      expect(screen.getAllByTestId('friends-btn').length).toBe(numFriendCards - 1);
    });
  });

  //1.14
  test('Clicking on a user opens a profile preview', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Bojangle Williams')[0]).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByText('Bojangle Williams')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
    });
  });

  //1.15
  test('Clicking on a friend renders their preview correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Bojangle Williams')[0]).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByText('Bojangle Williams')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
      const previewCardText = screen.getByTestId('preview-card').textContent;
      expect(previewCardText).toContain('Bojangle Williams');
      expect(previewCardText).toContain('I am a test user!');
      expect(previewCardText).toContain('123 Test St.');
      expect(previewCardText).toContain('(204) 456-7890');
      expect(previewCardText).toContain('1990');
      expect(previewCardText).toContain('2');
      expect(previewCardText).toContain('3');
      expect(previewCardText).toContain('He/Him');
    });
  });

  //1.16
  test('Clicking on a non-friend renders their preview correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Bobby Biggs')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Bobby Biggs'));
    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
      const previewCardText = screen.getByTestId('preview-card').textContent;
      expect(previewCardText).toContain('Bobby Biggs');
      expect(previewCardText).toContain('I am a test user also!');
      expect(previewCardText).not.toContain('999 Test St.');
      expect(previewCardText).not.toContain('(204) 999-9999');
      expect(previewCardText).not.toContain('1980');
      expect(previewCardText).toContain('4');
      expect(previewCardText).toContain('1');
      expect(previewCardText).toContain('They/Them');
    });
  });

  //1.17
  test('Clicking on a friend that hasnt filled in their details returns N/A', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByText('Duck Swanson')[0]).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByText('Duck Swanson')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
      const previewCardText = screen.getByTestId('preview-card').textContent;
      expect(previewCardText).toContain('Duck Swanson');
      expect(previewCardText).toContain('Excited to be part of the neighbourhood!');
      expect(previewCardText).toContain('Contact: N/A');
      expect(previewCardText).toContain('Birthday: N/A');
      expect(previewCardText).toContain('Pets: 0');
      expect(previewCardText).toContain('Kids: 0');
    });
  });

  //1.18
  test('Clicking on a user that hasnt filled in their details returns N/A', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Daniel Long')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Daniel Long'));
    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
      const previewCardText = screen.getByTestId('preview-card').textContent;
      expect(previewCardText).toContain('Daniel Long');
      expect(previewCardText).toContain('Excited to be part of the neighbourhood!');
      expect(previewCardText).toContain('Age:');
      expect(previewCardText).toContain('Pets: 0');
      expect(previewCardText).toContain('Kids: 0');
    });
  });
});
