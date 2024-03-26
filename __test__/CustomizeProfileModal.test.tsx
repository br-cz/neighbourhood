/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { Subject } from 'rxjs';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { notifications } from '@mantine/notifications';
import { DataProvider } from '@/contexts/DataContext';
import ProfilePage from '@/components/Profile/ProfilePage';
import { storeImage } from '@/components/utils/s3Helpers/UserProfilePictureS3Helper';

function createMockImageFile(filename = 'test-image.jpg', type = 'image/jpeg') {
  return new File([new Blob([], { type })], filename);
}
global.URL.createObjectURL = jest.fn(() => 'mock://image-preview');

const mockData = {
  currentUser: {
    id: 'test-user-id',
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

jest.mock('@/components/utils/s3Helpers/UserProfilePictureS3Helper', () => ({
  retrieveImage: jest.fn().mockResolvedValue('mock://image-preview'),
  storeImage: jest.fn().mockResolvedValue('mock://image-url'),
}));

jest.mock('@/src/hooks/usersCustomHooks', () => ({
  useCurrentUser: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
    updateUserProfile: jest.fn().mockResolvedValue(undefined),
  })),
  userUpdateSubject: new Subject<void>(),
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

describe('Customize Profile Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial customize button correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('customize-profile-btn')).toBeInTheDocument();
  });

  //1.2
  test('Opens the modal when the customize button is clicked', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId('customize-profile-btn')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('customize-profile-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('customize-profile-modal')).toBeInTheDocument();
    });
  });

  //1.3
  test('Renders the modal correctly with the correct fields', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));
    await waitFor(() => {
      expect(screen.getByText('Customize Profile')).toBeInTheDocument();
      expect(screen.getByTestId('profile-pic-upload')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Bio')).toBeInTheDocument();
      expect(screen.getAllByLabelText('Pronouns')[0]).toBeInTheDocument();
      expect(screen.getByLabelText('Contact')).toBeInTheDocument();
      expect(screen.getByLabelText('Birthday')).toBeInTheDocument();
      expect(screen.getByLabelText('Pets')).toBeInTheDocument();
      expect(screen.getByLabelText('Kids')).toBeInTheDocument();
    });
    await waitFor(() => {
      const imageElement = screen.getByRole('img') as HTMLImageElement;
      expect(imageElement).toHaveAttribute('src');
      expect(
        imageElement.src ===
          'https://i.pinimg.com/474x/b9/c1/88/b9c188de7d5e572dd57d5e4e291df7f5.jpg'
      ).toBe(true);
    });
  });

  //1.4
  test('Fields are usable and accept input', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));

    const firstNameInput = (await screen.findByLabelText('First Name')) as HTMLInputElement;
    const lastNameInput = (await screen.findByLabelText('Last Name')) as HTMLInputElement;
    const bioInput = (await screen.findByLabelText('Bio')) as HTMLInputElement;
    const contactInput = (await screen.findByLabelText('Contact')) as HTMLInputElement;
    const birthdayInput = (await screen.findByLabelText('Birthday')) as HTMLInputElement;
    const pronounsInput = (await screen.getAllByLabelText('Pronouns')[0]) as HTMLInputElement;
    const petsInput = (await screen.findByLabelText('Pets')) as HTMLInputElement;
    const kidsInput = (await screen.findByLabelText('Kids')) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(bioInput, { target: { value: 'New bio content' } });
    fireEvent.change(pronounsInput, { target: { value: 'she/her' } });
    fireEvent.change(contactInput, { target: { value: '(204) 999-9999' } });
    fireEvent.change(birthdayInput, { target: { value: new Date('1995-03-25') } });
    fireEvent.change(petsInput, { target: { value: '1' } });
    fireEvent.change(kidsInput, { target: { value: '1' } });

    expect(firstNameInput.value).toBe('Test');
    expect(lastNameInput.value).toBe('User');
    expect(bioInput.value).toBe('New bio content');
    expect(contactInput.value).toBe('(204) 999-9999');
    expect(pronounsInput.value).toBe('she/her');
    expect(birthdayInput.value).toContain('1995');
    expect(petsInput.value).toBe('1');
    expect(kidsInput.value).toBe('1');
  });

  //1.5
  test('Valid inputs submit correctly', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));

    const bioInput = (await screen.findByLabelText('Bio')) as HTMLInputElement;
    fireEvent.change(bioInput, { target: { value: 'New bio content' } });

    const saveChangesButton = screen.getByText('Save Changes');
    fireEvent.click(saveChangesButton);

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Profile Updated' })
      );
    });
  });

  //1.6
  test('Invalid inputs do not submit correctly', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));

    const contactInput = (await screen.findByLabelText('Contact')) as HTMLInputElement;
    fireEvent.change(contactInput, { target: { value: '204910339102' } });

    const saveChangesButton = screen.getByText('Save Changes');
    fireEvent.click(saveChangesButton);

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(expect.objectContaining({ title: 'Oops!' }));
    });
  });

  //1.7
  test('Changing the profile picture file changes the preview image', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));
    const fileInput = screen.getByTestId('profile-pic-upload');
    fireEvent.change(fileInput, { target: { files: [createMockImageFile()] } });
    await waitFor(() => {
      const imageElement = screen.getByRole('img') as HTMLImageElement;
      expect(imageElement).toHaveAttribute('src');
      expect(imageElement.src.startsWith('mock:')).toBe(true);
    });
  });

  //1.8
  test('Submitting a profile picture change stores it in S3', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));
    const fileInput = screen.getByTestId('profile-pic-upload');
    fireEvent.change(fileInput, { target: { files: [createMockImageFile()] } });
    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      expect(storeImage).toHaveBeenCalled();
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Profile Updated' })
      );
    });
  });

  //1.9
  test('Customize profile modal can be closed with changes', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('customize-profile-btn'));
    await waitFor(() => {
      expect(screen.getByText('Customize Profile')).toBeInTheDocument();
    });

    const bioInput = (await screen.findByLabelText('Bio')) as HTMLInputElement;
    fireEvent.change(bioInput, { target: { value: 'New bio content' } });

    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      expect(screen.queryByText('Customize Profile')).not.toBeInTheDocument();
    });
  });
});
