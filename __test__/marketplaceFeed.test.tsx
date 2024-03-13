/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
  import { render, waitFor, screen, fireEvent } from '@testing-library/react';
  import { DataProvider } from '@/contexts/DataContext';
  import MarketplacePage from '@/app/marketplace/page';

  const userHooks = require('@/src/hooks/usersCustomHooks');

  const mockData = {
    listings: [
      {
        id: '1',
        title: 'Test Item 1',
        description: 'This is a test item!',
        price: 100,
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
        price: 200,
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
});
