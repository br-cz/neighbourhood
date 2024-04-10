/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { DataProvider } from '@/src/contexts/DataContext';
import MarketplacePage from '@/src/components/Marketplace/MarketplacePage';
import { MarketplaceFeed } from '@/src/components/Marketplace/MarketplaceFeed/MarketplaceFeed';

const userHooks = require('@/src/hooks/usersCustomHooks');

const mockData = {
  listings: [
    {
      id: '1',
      title: 'Test Item 1',
      description: 'This is a test item!',
      price: 200,
      seller: {
        firstName: 'Bojangle',
        lastName: 'Williams',
      },
      isLiked: false,
    },
    {
      id: '2',
      title: 'Test Item 2',
      description: 'This is a second test item!',
      price: 100,
      seller: {
        firstName: 'Grunkle',
        lastName: 'Williams',
      },
    },
    {
      id: '3',
      title: 'Test Item 3',
      description: 'This is a third test item!',
      price: 300,
      seller: {
        firstName: 'LeJon',
        lastName: 'Brames',
      },
    },
  ],
};

jest.mock('@/src/hooks/marketplaceCustomHooks', () => ({
  useFetchListings: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreateListing: jest.fn(() => ({
    createdListing: jest.fn(),
  })),
  useDeleteListing: jest.fn(() => ({
    handleDeleteListing: jest.fn(),
  })),
  useListingSaves: jest.fn(() => ({
    saveListing: jest.fn(),
    unsaveListing: jest.fn(),
  })),
  useUserListingSaves: jest.fn(() => ({
    userListingSaves: {
      get: () => false,
    },
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <MarketplacePage />
      </DataProvider>
    </MantineProvider>
  );

const renderOrderedLtoH = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <MarketplaceFeed refresh={false} searchQuery="" sortQuery="Price: Low to High" />
      </DataProvider>
    </MantineProvider>
  );

const renderOrderedHtoL = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <MarketplaceFeed refresh={false} searchQuery="" sortQuery="Price: High to Low" />
      </DataProvider>
    </MantineProvider>
  );

describe('MarketplacePage', () => {
  userHooks.getCurrentUser.mockResolvedValue({
    id: '10',
    email: 'user@email.com',
    _version: 1,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial Marketplace page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'Marketplace' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the Post feed component correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('marketplace-feed').length).toBeGreaterThan(0);
    });
  });

  //1.3
  test('Renders an array of Listing Cards correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('marketplace-card').length).toBeGreaterThan(0);
    });
  });

  //1.4
  test('Renders an appropriate # of listing cards to listings in the community', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('marketplace-card').length).toBe(mockData.listings.length);
    });
  });

  //1.5
  test('Renders listing card content correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
      expect(screen.getByText('Bojangle Williams')).toBeInTheDocument();
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
      expect(screen.getByText('Grunkle Williams')).toBeInTheDocument();
      expect(screen.getByText('Test Item 3')).toBeInTheDocument();
      expect(screen.getByText('LeJon Brames')).toBeInTheDocument();
    });
  });

  //1.6
  test('Listing modal can be viewed correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('view-button')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('view-event-modal')).toBeInTheDocument();
      expect(screen.getByTestId('listing-modal-title')).toBeInTheDocument();
      expect(screen.getByTestId('listing-modal-price')).toBeInTheDocument();
      expect(screen.getByTestId('listing-modal-seller')).toBeInTheDocument();
      expect(screen.getByTestId('listing-modal-description')).toBeInTheDocument();
    });
  });

  //1.7
  test('Values in listing modal are rendered correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('view-button')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('listing-modal-title')).toHaveTextContent('Test Item 1');
      expect(screen.getByTestId('listing-modal-price')).toHaveTextContent('200');
      expect(screen.getByTestId('listing-modal-seller')).toHaveTextContent('Bojangle Williams');
      expect(screen.getByTestId('listing-modal-description')).toHaveTextContent(
        'This is a test item!'
      );
    });
  });

  //1.8
  test('Values are properly ordered by price from low to high', async () => {
    renderOrderedLtoH();

    await waitFor(() => {
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('view-button')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('listing-modal-title')).toHaveTextContent('Test Item 2');
      expect(screen.getByTestId('listing-modal-price')).toHaveTextContent('100');
      expect(screen.getByTestId('listing-modal-seller')).toHaveTextContent('Grunkle Williams');
      expect(screen.getByTestId('listing-modal-description')).toHaveTextContent(
        'This is a second test item!'
      );
    });
  });

  //1.8
  test('Values are properly ordered by price from high to low', async () => {
    renderOrderedHtoL();

    await waitFor(() => {
      expect(screen.getByText('Test Item 3')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('view-button')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('listing-modal-title')).toHaveTextContent('Test Item 3');
      expect(screen.getByTestId('listing-modal-price')).toHaveTextContent('300');
      expect(screen.getByTestId('listing-modal-seller')).toHaveTextContent('LeJon Brames');
      expect(screen.getByTestId('listing-modal-description')).toHaveTextContent(
        'This is a third test item!'
      );
    });
  });
});
