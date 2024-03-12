/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { modals } from '@mantine/modals';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SignUp } from '@/components/SignUp/SignUp';
import { DataProvider } from '@/contexts/DataContext';
import { EmailVerify } from '@/components/SignUp/EmailVerify';

const mockVerificationCode = jest.fn();

beforeEach(() => {
  jest.mock('formik', () => ({
    ...jest.requireActual('formik'),
    useFormik: jest.fn().mockImplementation(() => ({
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      values: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {},
      touched: {},
      validateForm: jest.fn().mockResolvedValue({}),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    })),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <SignUp />
      </DataProvider>
    </MantineProvider>
  );

const renderEmailVerify = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <EmailVerify verificationCode={mockVerificationCode} />
      </DataProvider>
    </MantineProvider>
  );

const completeStep1 = () => {
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'user@email.com' } });
  fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
  fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Continue/i));
};

const completeStep2 = async () => {
  await waitFor(() => {
    expect(screen.getByTestId('address')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByTestId('address'), { target: { value: '25 Smith St.' } });
  fireEvent.click(screen.getByText(/Continue/i));
};

const completeStep3 = async () => {
  await waitFor(() => {
    expect(screen.getByTestId('communities')).toBeInTheDocument();
    expect(screen.getByTestId('communities-item-community1')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId('communities-item-community1'));
  fireEvent.click(screen.getByText(/Continue/i));
};

const completeStep4 = async () => {
  await waitFor(() => {
    expect(screen.getByTestId('firstName')).toBeInTheDocument();
    expect(screen.getByTestId('lastName')).toBeInTheDocument();
    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('phone')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Grunkle' } });
  fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Williams' } });
  fireEvent.change(screen.getByTestId('username'), { target: { value: 'grunk' } });
  fireEvent.change(screen.getByTestId('phone'), { target: { value: '(999) 999-9999' } });
  fireEvent.click(screen.getByText(/Create Profile/i));
};

// Step 1: Test the initial signup component
describe('Initial Component & Step 1: Login Details', () => {
  //1.1
  test('Renders the initial page and stepper correctly', () => {
    renderComponent();
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });

  //1.2
  test('Renders step 1 correctly', async () => {
    renderComponent();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
  });

  //1.3
  test('Successfully selects and changes input fields', async () => {
    renderComponent();
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId('confirmPassword') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    await waitFor(() => {
      expect(emailInput.value).toBe('user@email.com');
      expect(passwordInput.value).toBe('password');
      expect(confirmPasswordInput.value).toBe('password');
    });
  });

  //1.4
  test('Navigates to Step 2 on valid input', async () => {
    renderComponent();
    await completeStep1();
    await waitFor(
      () => {
        expect(screen.queryByTestId('email')).not.toBeInTheDocument();
        expect(screen.queryByTestId('password')).not.toBeInTheDocument();
        expect(screen.queryByTestId('confirmPassword')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //1.5
  test('Doesnt navigate to Step 2 if fields are missing', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //1.5
  test('Doesnt navigate to Step 2 if email is present but invalid', async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'user' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //1.6
  test('Doesnt navigate to Step 2 if password is present but too short', async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'user@email.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'pas' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'pas' } });
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
        expect(screen.getByText('Password must be 8 characters or more.')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //1.7
  test('Doesnt navigate to Step 2 if passwords are present but dont match', async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'user@email.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'notpassword' } });
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
        expect(screen.getByText('Passwords must match')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //1.7
  test('Clicking back on step 1 opens a confirm modal to return to login', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Back/i));
    await waitFor(() => {
      expect(modals.openConfirmModal).toHaveBeenCalled();
    });
  });
});

// Step 2: Test the address input component
describe('Step 2: Address Input', () => {
  //2.1
  test('Renders step 2 correctly', async () => {
    renderComponent();
    await completeStep1();
    await waitFor(() => {
      expect(screen.getByTestId('address')).toBeInTheDocument();
    });
  });

  //2.2
  test('Step 2 fields are selectable and changeable', async () => {
    renderComponent();
    await completeStep1();
    await waitFor(() => {
      expect(screen.getByTestId('address')).toBeInTheDocument();
    });
    const addressInput = screen.getByTestId('address') as HTMLInputElement;
    fireEvent.change(addressInput, { target: { value: '25 Smith St.' } });
    await waitFor(() => {
      expect(addressInput.value).toBe('25 Smith St.');
    });
  });

  //2.3
  test('Navigates to Step 3 on valid input', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await waitFor(
      () => {
        expect(screen.queryByTestId('address')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //2.4
  test('Doesnt navigate to Step 3 if fields are missing', async () => {
    renderComponent();
    await completeStep1();
    await waitFor(() => {
      expect(screen.getByTestId('address')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByText('Address is required')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});

// Step 3: Test the community select component
describe('Step 3: Community Select', () => {
  //3.1
  test('Renders step 3 community list correctly with at least 1 item', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await waitFor(() => {
      expect(screen.getByTestId('communities')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('communities-item-community1')).toBeInTheDocument();
    });
  });

  //3.2
  test('Step 3 community items are selectable', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await waitFor(() => {
      expect(screen.getByTestId('communities-item-community1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('communities-item-community1'));
    await waitFor(() => {
      expect(screen.getByTestId('communities-item-community1')).toHaveClass('active');
    });
  });

  //3.3
  test('Navigates to Step 4 on valid community selection', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(
      () => {
        expect(screen.queryByTestId('communities')).not.toBeInTheDocument();
        expect(screen.queryByTestId('communities-item-community1')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //3.4
  test('Doesnt navigate to Step 4 if community not selected', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await waitFor(() => {
      expect(screen.getByTestId('communities-item-community1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(
      () => {
        expect(screen.getByText('Selecting a community required.')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});

// Step 4: Test the profile page
describe('Step 4: Profile Setup', () => {
  //4.1
  test('Renders step 4 fields correctly', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
      expect(screen.getByTestId('phone')).toBeInTheDocument();
    });
  });

  //4.2
  test('Step 4 community items are selectable and changeable', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
      expect(screen.getByTestId('phone')).toBeInTheDocument();
    });
    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByTestId('lastName') as HTMLInputElement;
    const usernameInput = screen.getByTestId('username') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone') as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: 'Grunkle' } });
    fireEvent.change(lastNameInput, { target: { value: 'Williams' } });
    fireEvent.change(usernameInput, { target: { value: 'grunk' } });
    fireEvent.change(phoneInput, { target: { value: '(999) 999-9999' } });
    await waitFor(() => {
      expect(firstNameInput.value).toBe('Grunkle');
      expect(lastNameInput.value).toBe('Williams');
      expect(usernameInput.value).toBe('grunk');
      expect(phoneInput.value).toBe('(999) 999-9999');
    });
  });

  //4.3
  test('Opens profile creation confirmation on valid Step 4 inputs', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await completeStep4();
    await waitFor(() => {
      expect(modals.openConfirmModal).toHaveBeenCalled();
    });
  });

  //4.4
  test('Doesnt create profile if Step 4 required fields are missing', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Create Profile/i));
    await waitFor(
      () => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //4.5
  test('Opens confirmation if Step 4 required fields are filled out but not optional fields', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Grunkle' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Williams' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'grunk' } });
    fireEvent.click(screen.getByText(/Create Profile/i));
    await waitFor(() => {
      expect(modals.openConfirmModal).toHaveBeenCalled();
    });
  });

  //4.6
  test('Doesnt open confirmation if username is filled out but invalid', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Grunkle' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Williams' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'gw' } });
    fireEvent.click(screen.getByText(/Create Profile/i));
    await waitFor(
      () => {
        expect(screen.getByText('Username must be 3 characters or more.')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //4.7
  test('Doesnt open confirmation if names are filled out but invalid', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('firstName'), { target: { value: '!!!!' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: '+>,dA<d28' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'grunkle' } });
    fireEvent.click(screen.getByText(/Create Profile/i));
    await waitFor(
      () => {
        expect(screen.getByText('First name must be valid')).toBeInTheDocument();
        expect(screen.getByText('Last name must be valid')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  //4.8
  test('Doesnt open confirmation if required fields are filled out correctly but optional fields are invalid', async () => {
    renderComponent();
    await completeStep1();
    await completeStep2();
    await completeStep3();
    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toBeInTheDocument();
      expect(screen.getByTestId('lastName')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Grunkle' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Williams' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'grunkle' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '!!#*3A81' } });
    fireEvent.click(screen.getByText(/Create Profile/i));
    await waitFor(
      () => {
        expect(screen.getByText('Phone number must be valid.')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});

// Step 5: Test the Email Verification component
describe('Step 5: Email Verification', () => {
  //1.1
  test('Renders email verification step correctly', async () => {
    renderEmailVerify();
    const pinInputs = screen.getAllByLabelText('PinInput');
    expect(pinInputs.length).toBe(6);
  });

  //5.2
  test('Successfully selects and changes input fields', async () => {
    renderEmailVerify();
    const pinInputs = screen.getAllByLabelText('PinInput');
    await userEvent.type(pinInputs[0], '1');
    await userEvent.type(pinInputs[1], '2');
    await userEvent.type(pinInputs[2], '3');
    await userEvent.type(pinInputs[3], '4');
    await userEvent.type(pinInputs[4], '5');
    await userEvent.type(pinInputs[5], '6');
    expect(pinInputs[0]).toHaveValue('1');
    expect(pinInputs[1]).toHaveValue('2');
    expect(pinInputs[2]).toHaveValue('3');
    expect(pinInputs[3]).toHaveValue('4');
    expect(pinInputs[4]).toHaveValue('5');
    expect(pinInputs[5]).toHaveValue('6');
  });
});
