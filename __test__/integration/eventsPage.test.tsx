import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import EventsPage from '@/app/events/page';
import { DataProvider } from '@/contexts/DataContext';

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <EventsPage />
      </DataProvider>
    </MantineProvider>
  );

describe('EventsPage Integration Tests', () => {
  test('Creating an event updates the global state and is reflected in another component', async () => {
    renderComponent();

    await act(async () => {
      fireEvent.click(screen.getByText(/New Event.../i));
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId('create-event-name-input'), {
        target: { value: 'Community Meetup' },
      });
      fireEvent.change(screen.getByTestId('location'), { target: { value: '123 Sesame Street' } });
      fireEvent.change(screen.getByTestId('time'), { target: { value: '12:00' } });
      fireEvent.click(screen.getByText(/Post Event/i));
    });

    await waitFor(() => expect(screen.getByText(/Community Meetup/i)).toBeInTheDocument());
  });
});

test('Event creation failure does not update global state or other components', async () => {
  renderComponent();

  // Assume there's a mechanism to simulate a failure in event creation, like mocking an API response

  // Attempt to create a new event
  await userEvent.click(screen.getByText(/New Event.../i));
  await userEvent.type(screen.getByTestId('create-event-name-input'), 'Failed Event');
  await userEvent.type(screen.getByTestId('location'), 'Nowhere');
  await userEvent.type(screen.getByTestId('time'), '00:00');
  await act(async () => {
    await userEvent.click(screen.getByText(/Post Event/i));
  });

  // Wait and check that the event was not added
  await waitFor(() => expect(screen.queryByText(/Failed Event/i)).not.toBeInTheDocument());

  // Verify that the global state or other components relying on this state are not updated
  expect(screen.getByTestId('events-list')).not.toContainElement(screen.getByText(/Failed Event/i));
});
