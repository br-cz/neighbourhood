/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { DataProvider } from '@/src/contexts/DataContext';
import HomePage from '@/src/components/Home/HomePage';

const userHooks = require('@/src/hooks/usersCustomHooks');

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
      isAuthor: false,
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
      isAuthor: false,
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
      isAuthor: false,
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
  useDeleteComment: jest.fn(() => ({
    handleDeleteComment: jest.fn(),
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
  userHooks.getCurrentUser.mockResolvedValue({
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
      expect(screen.getAllByTestId('post-feed').length).toBeGreaterThan(0);
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
  test('Renders an appropriate # of post cards to posts in the community', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('post-card').length).toBe(mockData.posts.length);
    });
  });

  //1.5
  test('Renders post card content correctly', async () => {
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

  //1.6
  test('Posts can be liked correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('This is a test post!')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('like-button')[0]);
    await waitFor(() => {
      expect(screen.getByText('Liked')).toBeInTheDocument();
    });
  });

  //1.7
  test('liking and unliking a post', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('post-card')).toHaveLength(mockData.posts.length);
    });
    const likeButton = screen.getAllByTestId('like-button')[0];
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(mockLikePost).toHaveBeenCalledTimes(1);
    });
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(mockUnlikePost).toHaveBeenCalledTimes(1);
    });
  });
});

//1.8
test('Comments are rendered for a post', async () => {
  renderComponent();

  await waitFor(() => {
    const comments = screen.getAllByTestId('comment-card');
    expect(comments.length).toBe(2);
    expect(screen.getByText('This is the first comment')).toBeInTheDocument();
    expect(screen.getByText('This is the second comment')).toBeInTheDocument();
  });
});

//1.9
test('Clicking "Comment" makes the comment input visible', async () => {
  renderComponent();
  const commentButton = screen.getAllByText('Comment')[0];
  fireEvent.click(commentButton);
  await waitFor(() => {
    const commentInput = screen.getAllByTestId('comment-input')[0];
    expect(commentInput).toBeInTheDocument();
  });
});

//1.10
test('Submitting a comment calls create comment function', async () => {
  renderComponent();

  const commentButton = screen.getAllByText('Comment')[0];
  fireEvent.click(commentButton);
  await waitFor(() => {
    expect(screen.getAllByTestId('comment-input')[0]).toBeInTheDocument();
  });

  fireEvent.change(screen.getAllByTestId('comment-input')[0], {
    target: { value: 'New test comment' },
  });
  fireEvent.click(screen.getAllByTestId('submit-comment')[0]);
  await waitFor(() => {
    expect(mockHandleCreateComment).toHaveBeenCalledWith(
      expect.objectContaining({ content: 'New test comment' })
    );
  });
});

//1.11
test('Submitting an invalid comment results in an error popup', async () => {
  renderComponent();

  const commentButton = screen.getAllByText('Comment')[0];
  fireEvent.click(commentButton);
  await waitFor(() => {
    expect(screen.getAllByTestId('comment-input')[0]).toBeInTheDocument();
  });

  fireEvent.change(screen.getAllByTestId('comment-input')[0], {
    target: { value: '' },
  });
  fireEvent.click(screen.getAllByTestId('submit-comment')[0]);
  await waitFor(() => {
    expect(notifications.show).toHaveBeenCalledWith(expect.objectContaining({ title: 'Oops!' }));
  });
});
