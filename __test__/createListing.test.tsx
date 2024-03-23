import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketplacePage from '@/components/Marketplace/MarketplacePage';
import { CreateListingDrawer } from '@/components/Marketplace/CreateListingDrawer';
import { DataProvider } from '@/contexts/DataContext';
import { Visibility } from '@/src/API';
import userEvent from '@testing-library/user-event';
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: jest.fn().mockImplementation(() => ({
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {
      title: '',
      price: '',
      description: '',
      contact: '',
      visibility: Visibility.PUBLIC,
    },
    errors: {},
    touched: {},
    validateForm: jest.fn().mockResolvedValue({
      title: 'Title is required',
      price: 'Price is required',
      contact: 'Contact is required',
    }),
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn(),
    getFieldProps: jest.fn().mockImplementation(() => ({
      onChange: jest.fn(),
      onBlur: jest.fn(),
    })),
    submitForm: jest.fn(),
    resetForm: jest.fn(),
  })),
}));

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <MarketplacePage />
      </DataProvider>
    </MantineProvider>
  );

const renderDrawerWithImage = () =>
  render(
    <MantineProvider>
      <CreateListingDrawer opened={true} onClose={() => {}} onPostCreated={() => {}} />
    </MantineProvider>
  );

describe('MarketplacePage - Create Listing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    // Clear input fields
    const titleInput = screen.queryByTestId('title-input');
    const priceInput = screen.queryByTestId('price-input');
    const descriptionInput = screen.queryByTestId('description');
    const contactInput = screen.queryByTestId('contact');
    
    if (titleInput) userEvent.clear(titleInput);
    if (priceInput) userEvent.clear(priceInput);
    if (descriptionInput) userEvent.clear(descriptionInput);
    if (contactInput) userEvent.clear(contactInput);
  });

  //1.1
  test('Render the creating listings button correctly', async () => {
    //First render the component
    renderComponent();
    //Check if the button is rendered
    expect(screen.getByText(/New Listing.../i)).toBeInTheDocument();
  });

  //1.2
  test('Render create listings drawer after button click', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));
    expect(screen.getByTestId(/create-listing-drawer/i)).toBeInTheDocument();
  });

  //1.3
  test('Render listings drawer with the correct fields', async () => {
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));
    await waitFor(() => {
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('price-input')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('contact')).toBeInTheDocument();
    });
  });

  //1.4
  test('Drawer fields are selectable and change to the correctly inputted values', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));

    await userEvent.type(screen.getByTestId('title-input'), 'Test Item');
    await userEvent.type(screen.getByTestId('price-input'), '100');
    await userEvent.type(screen.getByTestId('description'), 'This is a test description');
    await userEvent.type(screen.getByTestId('contact'), '1234567890');

    await waitFor(
      () => {
        expect(screen.getByTestId('title-input')).toHaveValue('Test Item');
        expect(screen.getByTestId('price-input')).toHaveValue('$100');
        expect(screen.getByTestId('description')).toHaveValue('This is a test description');
      },
      { timeout: 2000 }
    );
  });

  //1.5
  test('Drawer does not close if listing title is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));

    userEvent.type(screen.getByTestId('price-input'), '100');
    userEvent.type(screen.getByTestId('description'), 'This is a test description');
    userEvent.type(screen.getByTestId('contact'), '1234567890');

    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Item/i));

    await waitFor(
      () => {
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('price-input')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('contact')).toBeInTheDocument();
        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      { timeout: 2000 }
    );
  });

  //1.6
  test('Drawer does not close if price is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));

    userEvent.type(screen.getByTestId('title-input'), 'Test Item');
    userEvent.type(screen.getByTestId('description'), 'This is a test description');
    userEvent.type(screen.getByTestId('contact'), '1234567890');


    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Item/i));

    await waitFor(
      () => {
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('price-input')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('contact')).toBeInTheDocument();
        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      { timeout: 2000 }
    );
  });

  //1.7
  test('Drawer does not close if contact is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Listing.../i));

    userEvent.type(screen.getByTestId('title-input'), 'Test Item');
    userEvent.type(screen.getByTestId('price-input'), '100');
    userEvent.type(screen.getByTestId('description'), 'This is a test description');

    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Item/i));

    await waitFor(
      () => {
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('price-input')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('contact')).toBeInTheDocument();
        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      { timeout: 2000 }
    );
  });

  //1.8
  test('Drawer closes on valid form submission', async () => {
    //Here we are testing if the drawer closes after a valid form submission
    renderComponent();
    fireEvent.click(screen.getByText(/New Listing.../i));

    await waitFor(() => {
      expect(screen.getByTestId('title-input')).toBeInTheDocument();
    });
    userEvent.type(screen.getByTestId('title-input'), 'Test Item');
    userEvent.type(screen.getByTestId('price-input'), '100');
    userEvent.type(screen.getByTestId('description'), 'This is a test description');
    userEvent.type(screen.getByTestId('contact'), '1234567890');

    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(
      () => {
        expect(screen.queryByTestId('title-input')).not.toBeInTheDocument();
        expect(screen.queryByTestId('price-input')).not.toBeInTheDocument();
        expect(screen.queryByTestId('description')).not.toBeInTheDocument();
        expect(screen.queryByTestId('contact')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
