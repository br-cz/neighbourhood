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
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

//Global mocks

jest.mock('@/src/components/Authorization/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: 'user1',
  })),
}));

const closestCommunityMock = jest.fn().mockResolvedValue([
  {
    community: {
      id: 'community1',
      name: 'Community 1',
      address: '123 Fake St',
    },
    distanceKm: 5,
  },
  {
    community: {
      id: 'community2',
      name: 'Community 2',
      address: '456 Fake St',
    },
    distanceKm: 10,
  },
]);
jest.mock('@/src/utils/relevantCommunitiesHelpers/getClosestCommunities', () => ({
  getClosestCommunities: closestCommunityMock,
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
  getCurrentUser: jest.fn(), // Keep this mock as-is, assuming it's used within the fetchCurrentUser function.
  useCurrentUser: jest.fn(() => ({
    currentUser: {
      id: 'user1',
      username: 'testUser1',
      email: 'test@example.com',
      postalCode: '12345',
      firstName: 'Test',
      lastName: 'User',
      selectedCommunity: 'community1',
      location: 'Test Location1',
      // Uncomment or add more fields as necessary based on what you test.
      // age: 30,
      // bio: 'This is a test bio.',
      // profilePic: 'path/to/profilePic.jpg',
      // pets: 1,
      // kids: 2,
    },
    loading: false, // Reflect the initial loading state; adjust based on what you're testing.
    error: null, // Reflect the initial error state; adjust as necessary for error handling tests.
    updateUserProfile: jest.fn(async (values, profilePicFile) => {
      // Implement mock logic for updateUserProfile here.
      // You could return a new user object reflecting the update.
      // This is a simplified example; adjust the logic to match your application's behavior.
      return {
        ...values, // Spread the updated values to simulate updating the user profile.
        profilePic: profilePicFile ? 'path/to/newProfilePic.jpg' : 'path/to/profilePic.jpg',
      };
    }),
  })),
}));

jest.mock('@/src/hooks/communityCustomHooks', () => ({
  useCurrentCommunity: jest.fn(() => ({
    community: {
      id: 'community1',
      name: 'Test Community1',
      image: 'community-image-url',
      location: 'Community Location1',
      posts: {
        items: [{ id: 'post1' }],
      },
      members: {
        items: [
          {
            _deleted: false,
            id: 'member1',
            userId: 'user1',
            user: {
              id: 'user1',
              friends: [],
            },
          },
        ],
      },
    },
  })),

  useFetchAllCommunities: jest.fn(() => ({
    communities: [
      // items: [
      {
        id: 'community1',
        name: 'Test Community1',
        image: 'community-image-url',
        location: 'Community Location1',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member1',
              userId: 'user1',
              user: {
                id: 'user1',
                friends: [],
              },
            },
          ],
        },
      },
      {
        id: 'community2',
        name: 'Test Community2',
        image: 'community-image-url',
        location: 'Community Location2',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member2',
              userId: 'user3',
              user: {
                id: 'user3',
                friends: [],
              },
            },
          ],
        },
      },
      {
        id: 'community3',
        name: 'Test Community3',
        image: 'community-image-url',
        location: 'Community Location3',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member3',
              userId: 'user3',
              user: {
                id: 'user3',
                friends: [],
              },
            },
          ],
        },
      },
    ],
    // ],
    loading: false,
  })),

  useFetchRelevantCommunities: jest.fn(() => ({
    communities: [
      // items: [
      {
        id: 'community1',
        name: 'Test Community1',
        image: 'community-image-url',
        location: 'Community Location1',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member1',
              userId: 'user1',
              user: {
                id: 'user1',
                friends: [],
              },
            },
          ],
        },
      },
      {
        id: 'community2',
        name: 'Test Community2',
        image: 'community-image-url',
        location: 'Community Location2',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member2',
              userId: 'user3',
              user: {
                id: 'user3',
                friends: [],
              },
            },
          ],
        },
      },
      {
        id: 'community3',
        name: 'Test Community3',
        image: 'community-image-url',
        location: 'Community Location3',
        posts: {
          items: [{ id: 'post1' }],
        },
        members: {
          items: [
            {
              _deleted: false,
              id: 'member3',
              userId: 'user3',
              user: {
                id: 'user3',
                friends: [],
              },
            },
          ],
        },
      },
    ],
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
          location: 'Test Location1',

          // age: 30,
          // bio: 'This is a test bio.',
          // profilePic: 'path/to/profilePic.jpg',
          // pets: 1,
          // kids: 2,
        },
        _deleted: false,
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
          location: 'Test Location2',
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
          location: 'Test Location3',
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

jest.mock('@/src/utils/s3Helpers/UserProfilePictureS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/src/utils/s3Helpers/CommunityImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/src/utils/s3Helpers/EventImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/src/utils/s3Helpers/PostImageS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue(''),
}));

jest.mock('@/src/utils/s3Helpers/ItemForSaleImageS3Helper', () => ({
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
    handleCreatePost: jest.fn().mockResolvedValue(true),
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

jest.mock('@/src/hooks/googleMapsAPI', () => ({
  useGoogleMapsApi: jest.fn(() => ({
    isLoaded: true,
    loadError: null,
  })),
}));
