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

jest.mock('aws-amplify/auth', () => ({
  updateUserAttributes: jest.fn(),
  updatePassword: jest.fn().mockResolvedValue(true),
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

jest.mock('@/src/api/appQueries', () => ({
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
  useCurrentCommunity: jest.fn(() => ({
    community: {
      id: 'community1',
      name: 'Test Community',
      location: 'Test Location',
      // coordinates: '123, 456',
      image: 'path/to/communityImage.jpg',
    },
  })),
  getCurrentCommunity: jest.fn(),
  getCurrentCommunityID: jest.fn(() => {
    // return what you want this function to return during tests
    return 'community1';
  }),
}));

jest.mock('@/src/api/userQueries', () => ({
  updateUserEmail: jest.fn(),
}));

// jest.mock('@/src/api/postQueries', () => ({
//   useFetchPosts: jest.fn(() => ({
//     events: [],
//     loading: true,
//   })),
//   useCreatePost: () => ({
//     handleCreatePost: jest.fn().mockResolvedValue(true)
//   }),
// }));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
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