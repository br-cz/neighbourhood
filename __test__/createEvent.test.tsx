import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventsPage from '@/app/events/page';
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
      name: '',
      description: '',
      location: '',
      date: new Date(),
      time: '',
      visibility: Visibility.PUBLIC,
    },
    errors: {},
    touched: {},
    validateForm: jest.fn().mockResolvedValue({
      name: 'Name is required',
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
        <EventsPage />
      </DataProvider>
    </MantineProvider>
  );

describe('EventsPage - Create Event', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //1.1
  test('Render Event Page', async () => {
    renderComponent();
    expect(screen.getByText(/New Event.../i)).toBeInTheDocument();
  });

  //1.2
  test('Render Create Event Button', async () => {
    //First render the component
    renderComponent();
    //Check if the button is rendered
    expect(screen.getByText(/New Event.../i)).toBeInTheDocument();
  });

  //1.3
  test('Render Create Event Drawer after button click', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Event.../i));

    //Check if the drawer is rendered by verifying the header text
    expect(screen.getByTestId(/New Event/i)).toBeInTheDocument();
  });

  //1.4
  test('Drawer does not close if event name is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Event.../i));

    userEvent.type(screen.getByTestId('location'), '123 Sesame Street');
    userEvent.type(screen.getByTestId('time'), '12:00');

    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Event/i));

    await waitFor(
      () => {
        expect(screen.queryByTestId('create-event-name-input')).toBeInTheDocument();
        expect(screen.queryByTestId('location')).toBeInTheDocument();
        expect(screen.queryByTestId('time')).toBeInTheDocument();
        expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Oops!',
          })
        );
      },
      { timeout: 2000 }
    );
  });

  //1.5
  test('Drawer does not close if location is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Event.../i));

    userEvent.type(screen.getByTestId('create-event-name-input'), 'Garage Sale');
    userEvent.type(screen.getByTestId('time'), '12:00');

    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Event/i));

    await waitFor(
      () => {
        expect(screen.queryByTestId('create-event-name-input')).toBeInTheDocument();
        expect(screen.queryByTestId('location')).toBeInTheDocument();
        expect(screen.queryByTestId('time')).toBeInTheDocument();
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
  test('Drawer does not close if time is missing', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Event.../i));

    userEvent.type(screen.getByTestId('create-event-name-input'), 'Garage Sale');
    userEvent.type(screen.getByTestId('location'), '123 Sesame Street');

    // Submit the form without filling in the required fields
    await userEvent.click(screen.getByText(/Post Event/i));

    await waitFor(
      () => {
        expect(screen.queryByTestId('create-event-name-input')).toBeInTheDocument();
        expect(screen.queryByTestId('location')).toBeInTheDocument();
        expect(screen.queryByTestId('time')).toBeInTheDocument();
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
  test('Drawer closes on valid form submission', async () => {
    //Here we are testing if the drawer closes after a valid form submission
    renderComponent();
    fireEvent.click(screen.getByText(/New Event.../i));

    await waitFor(() => {
      expect(screen.getByTestId('create-event-name-input')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId('create-event-name-input'), {
      target: { value: 'Garage Sale' },
    });
    fireEvent.change(screen.getByTestId('location'), { target: { value: '123 Sesame Street' } });
    fireEvent.change(screen.getByTestId('time'), { target: { value: '12:00' } });
    fireEvent.click(screen.getByText(/Post Event/i));

    await waitFor(
      () => {
        expect(screen.queryByTestId('create-event-name-input')).not.toBeInTheDocument();
        expect(screen.queryByTestId('location')).not.toBeInTheDocument();
        expect(screen.queryByTestId('time')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  //1.8
  test('Drawer fields are selectable and change to the correctly inputted values', async () => {
    //First render the component
    renderComponent();
    await userEvent.click(screen.getByText(/New Event.../i));

    await userEvent.type(screen.getByTestId('create-event-name-input'), 'Garage Sale');
    await userEvent.type(screen.getByTestId('location'), '123 Sesame Street');
    await userEvent.type(screen.getByTestId('time'), '12:00');

    await waitFor(
      () => {
        expect(screen.queryByTestId('create-event-name-input')).toHaveValue('Garage Sale');
        expect(screen.queryByTestId('location')).toHaveValue('123 Sesame Street');
        expect(screen.queryByTestId('time')).toHaveValue('12:00');
      },
      { timeout: 2000 }
    );
  });
});
