require('@testing-library/jest-dom');

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

window.ResizeObserver = ResizeObserver;


//Global mocks

jest.mock('@/components/Authorization/useAuth', () => ({
  useAuth: () => ({ user: { loggedIn: true } }),
}));

jest.mock('@aws-amplify/auth', () => ({
  updateUserAttributes: jest.fn(),
  updatePassword: jest.fn().mockResolvedValue(true),
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(() => ({
    userId: jest.fn(),
  })),
}));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/mocked-path'),
}));

jest.mock('@/src/hooks/usersCustomHooks', () => ({
  getCurrentUser: jest.fn(),
  useCurrentUser: jest.fn(() => ({
    user: {
      id: 'user1',
      username: 'testUser',
      email: 'test@example.com',
      postalCode: '12345',
      firstName: 'Test',
      lastName: 'User',
      selectedCommunity: 'communityId',
      location: 'Test Location',
      // age: 30,
      // bio: 'This is a test bio.',
      // profilePic: 'path/to/profilePic.jpg',
      // pets: 1,
      // kids: 2,
    },
  })),
}));

jest.mock('@/src/hooks/communityCustomHooks', () => ({
  useCurrentCommunity: jest.fn(() => ({
    community: {
      id: 'community1',
      name: 'Test Community',
      location: 'Test Location',
      // coordinates: '123, 456',
      image: 'path/to/communityImage.jpg',
    },
  })),

  useFetchAllCommunities: jest.fn(() => ({
    communities: [
      {
        id: 'community1',
        name: 'Test Community1',
        location: 'Test Location',
        // coordinates: '123, 456',
        image: 'path/to/communityImage.jpg',
        members: ['user1', 'user2', 'user3'],
        posts: ['post1', 'post2', 'post3'],
      },

      {
        id: 'community2',
        name: 'Test Community2',
        location: 'Test Location',
        // coordinates: '123, 456',
        image: 'path/to/communityImage.jpg',
        members: ['user1', 'user2', 'user3'],
        posts: ['post1', 'post2', 'post3'],
      },
      {
        id: 'community3',
        name: 'Test Community3',
        location: 'Test Location',
        // coordinates: '123, 456',
        image: 'path/to/communityImage.jpg',
        members: ['user1', 'user2', 'user3'],
        posts: ['post1', 'post2', 'post3'],
      },
    ],
    loading: false,
  })),

  useFetchAllUserCommunities: jest.fn(() => ({
    userCommunityList: [
      {
        id: 'userCommunity1',
        communityId: 'community1',
        userId: 'user1',
        user: {
          id: 'user1',
          username: 'testUser1',
          email: 'test1@example.com',
          postalCode: '12345',
          firstName: 'Test',
          lastName: 'User1',
          selectedCommunity: 'community1',
          location: 'Test Location',
          // age: 30,
          // bio: 'This is a test bio.',
          // profilePic: 'path/to/profilePic.jpg',
          // pets: 1,
          // kids: 2,
        },
      },

      {
        id: 'userCommunity2',
        communityId: 'community2',
        userId: 'user2',
        user: {
          id: 'user2',
          username: 'testUser2',
          email: 'test2@example.com',
          postalCode: '12345',
          firstName: 'Test',
          lastName: 'User2',
          selectedCommunity: 'community2',
          location: 'Test Location',
          // age: 30,
          // bio: 'This is a test bio.',
          // profilePic: 'path/to/profilePic.jpg',
          // pets: 1,
          // kids: 2,
        },
      },
      {
        id: 'userCommunity3',
        communityId: 'community3',
        userId: 'user3',
        user: {
          id: 'user3',
          username: 'testUser3',
          email: 'test3@example.com',
          postalCode: '12345',
          firstName: 'Test',
          lastName: 'User3',
          selectedCommunity: 'community3',
          location: 'Test Location',
          // age: 30,
          // bio: 'This is a test bio.',
          // profilePic: 'path/to/profilePic.jpg',
          // pets: 1,
          // kids: 2,
        },
      },
    ],
    loading: false,
  })),

}));

jest.mock('@/src/api/services/user', () => ({
  updateUserEmailAPI: jest.fn(),
  createUserAPI: jest.fn(),
  createUserCommunityAPI: jest.fn(),
  updateUserProfilePicAPI: jest.fn(),
  getUserAPI: jest.fn(),
}));

jest.mock('@/components/utils/s3Helpers/UserProfilePictureS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/components/utils/s3Helpers/CommunityImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/components/utils/s3Helpers/EventImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/components/utils/s3Helpers/PostImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/components/utils/s3Helpers/ItemForSaleImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/src/hooks/eventsCustomHooks', () => ({
  useFetchEvents: jest.fn(() => ({
    events: [],
    loading: true,
  })),
  useCreateEvent: () => ({ handleCreateEvent: jest.fn().mockResolvedValue(true) }),
}));

jest.mock('@/src/hooks/postsCustomHooks', () => ({
  useFetchPosts: jest.fn(() => ({
    posts: [],
    loading: true,
  })),
  useCreatePost: () => ({
    handleCreatePost: jest.fn().mockResolvedValue(true)
  }),
}));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

jest.mock('@mantine/modals', () => ({
  modals: {
    openConfirmModal: jest.fn(({ onConfirm }) => {
      onConfirm();
    }),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/mocked-path'),
}));

jest.mock('@mantine/modals', () => ({
  modals: {
    openConfirmModal: jest.fn(({ onConfirm }) => {
      onConfirm();
    }),
  },
}));