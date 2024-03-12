/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
  import { notifications } from '@mantine/notifications';
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

  //   //1.6
  //   test('Posts can be liked correctly', async () => {
  //     renderComponent();
  //     await waitFor(() => {
  //       expect(screen.getByText('This is a test post!')).toBeInTheDocument();
  //     });
  //     fireEvent.click(screen.getAllByTestId('like-button')[0]);
  //     await waitFor(() => {
  //       expect(screen.getByText('Liked')).toBeInTheDocument();
  //     });
  //   });

  //   //1.7
  //   test('liking and unliking a post', async () => {
  //     renderComponent();
  //     await waitFor(() => {
  //       expect(screen.getAllByTestId('post-card')).toHaveLength(mockData.listings.length);
  //     });
  //     const likeButton = screen.getAllByTestId('like-button')[0];
  //     fireEvent.click(likeButton);
  //     await waitFor(() => {
  //       expect(mockLikePost).toHaveBeenCalledTimes(1);
  //     });
  //     fireEvent.click(likeButton);
  //     await waitFor(() => {
  //       expect(mockUnlikePost).toHaveBeenCalledTimes(1);
  //     });
  //   });
  // });

  // //1.8
  // test('Comments are rendered for a post', async () => {
  //   renderComponent();

  //   await waitFor(() => {
  //     const comments = screen.getAllByTestId('comment-card');
  //     expect(comments.length).toBe(2);
  //     expect(screen.getByText('This is the first comment')).toBeInTheDocument();
  //     expect(screen.getByText('This is the second comment')).toBeInTheDocument();
  //   });
  // });

  // //1.9
  // test('Clicking "Comment" makes the comment input visible', async () => {
  //   renderComponent();
  //   const commentButton = screen.getAllByText('Comment')[0];
  //   fireEvent.click(commentButton);
  //   await waitFor(() => {
  //     const commentInput = screen.getAllByTestId('comment-input')[0];
  //     expect(commentInput).toBeInTheDocument();
  //   });
  // });

  // //1.10
  // test('Submitting a comment calls create comment function', async () => {
  //   renderComponent();

  //   const commentButton = screen.getAllByText('Comment')[0];
  //   fireEvent.click(commentButton);
  //   await waitFor(() => {
  //     expect(screen.getAllByTestId('comment-input')[0]).toBeInTheDocument();
  //   });

  //   fireEvent.change(screen.getAllByTestId('comment-input')[0], {
  //     target: { value: 'New test comment' },
  //   });
  //   fireEvent.click(screen.getAllByTestId('submit-comment')[0]);
  //   await waitFor(() => {
  //     expect(mockHandleCreateComment).toHaveBeenCalledWith(
  //       expect.objectContaining({ content: 'New test comment' })
  //     );
  //   });
  // });

  // //1.11
  // test('Submitting an invalid comment results in an error popup', async () => {
  //   renderComponent();

  //   const commentButton = screen.getAllByText('Comment')[0];
  //   fireEvent.click(commentButton);
  //   await waitFor(() => {
  //     expect(screen.getAllByTestId('comment-input')[0]).toBeInTheDocument();
  //   });

  //   fireEvent.change(screen.getAllByTestId('comment-input')[0], {
  //     target: { value: '' },
  //   });
  //   fireEvent.click(screen.getAllByTestId('submit-comment')[0]);
  //   await waitFor(() => {
  //     expect(notifications.show).toHaveBeenCalledWith(expect.objectContaining({ title: 'Oops!' }));
  //   });
  // });
});
