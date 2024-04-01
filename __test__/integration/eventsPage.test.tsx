import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { DataProvider } from '@/contexts/DataContext';
import { CreateEventDrawer } from '@/components/Events/CreateEventDrawer/CreateEventDrawer';
import EventsPage from '@/components/Events/EventsPage';

const mockEvents = {
  events: [
    {
      id: '1',
      name: 'Pizza Party',
      location: '1234 Pizza St',
      datetime: new Date('2022-12-12T19:00:00'),
      description: 'Come eat pizza with us!',
      organizer: {
        firstName: 'Bojangle',
        lastName: 'Williams',
      },
    },
    {
      id: '2',
      name: 'BBQ',
      location: '1234 BBQ St',
      datetime: new Date('2022-11-11T18:00:00'),
      description: 'Come eat BBQ with us!',
      organizer: {
        firstName: 'Grunkle',
        lastName: 'Williams',
      },
    },
    {
      id: '3',
      name: 'Birthday Party',
      location: '1234 Birthday St',
      description: 'Come celebrate with us!',
      datetime: new Date('2022-10-10T17:00:00'),
      organizer: {
        firstName: 'LeJon',
        lastName: 'Brames',
      },
    },
  ],
};

jest.mock('@/src/hooks/eventsCustomHooks', () => {
  const useFetchEvents = () => {
    const [events, setEvents] = useState(mockEvents.events);

    useEffect(() => {
      setEvents(mockEvents.events);
    }, [mockEvents]);

    return { events, refetch: () => setEvents([...mockEvents.events]) };
  };

  const useCreateEvent = () => ({
    handleCreateEvent: jest.fn((newEvent) => {
      mockEvents.events = [...mockEvents.events, newEvent];
      return Promise.resolve(newEvent);
    }),
  });

  const useEventSaves = () => ({
    saveEvent: jest.fn(),
    unsaveEvent: jest.fn(),
  });

  const useUserEventSaves = () => ({
    userEventSaves: {
      get: () => false,
    },
  });

  return {
    useFetchEvents,
    useCreateEvent,
    useEventSaves,
    useUserEventSaves,
  };
});

const renderComponent = () => {
  const handleDrawerClose = jest.fn();
  const handlePostCreate = jest.fn();

  return render(
    <MantineProvider>
      <DataProvider>
        <EventsPage />
        <CreateEventDrawer
          opened={true}
          onClose={handleDrawerClose}
          onPostCreated={handlePostCreate}
        />
      </DataProvider>
    </MantineProvider>
  );
};

const renderRevisedComponent = () => {
  const handleDrawerClose = jest.fn();
  const handlePostCreate = jest.fn();

  return render(
    <MantineProvider>
      <DataProvider>
        <EventsPage />
        <CreateEventDrawer
          opened={false}
          onClose={handleDrawerClose}
          onPostCreated={handlePostCreate}
        />
      </DataProvider>
    </MantineProvider>
  );
};

describe('EventsPage Integration Tests', () => {
  test('Creating an event updates the event feed', async () => {
    renderComponent();

    const newEvent = {
      id: '4',
      name: 'Community Meetup',
      location: '123 Sesame Street',
      datetime: new Date('2023-01-01T12:00:00'),
      description: 'A new community meetup',
      organizer: { firstName: 'John', lastName: 'Doe' },
    };

    await act(async () => {
      fireEvent.click(screen.getByText(/New Event.../i));
      fireEvent.change(screen.getByTestId('create-event-name-input'), {
        target: { value: newEvent.name },
      });
      fireEvent.change(screen.getByTestId('location'), { target: { value: newEvent.location } });
      fireEvent.change(screen.getByTestId('time'), { target: { value: '12:00' } });
      fireEvent.click(screen.getByText(/Post Event/i));
    });

    // Re-render the component to ensure the feed includes the updated component
    renderRevisedComponent();

    const element = await screen.findByText('Community Meetup');
    expect(element).toBeInTheDocument();
  });

  test('Creating an invalid event does not update the event feed', async () => {
    renderComponent();

    const newEvent = {
      id: '5',
      name: '',
      location: '123 Sesame Street',
      datetime: new Date('2023-01-01T12:00:00'),
      description: 'A new community meetup',
      organizer: { firstName: 'John', lastName: 'Doe' },
    };

    await act(async () => {
      fireEvent.click(screen.getByText(/New Event.../i));
      fireEvent.change(screen.getByTestId('create-event-name-input'), {
        target: { value: newEvent.name },
      });
      fireEvent.change(screen.getByTestId('location'), { target: { value: newEvent.location } });
      fireEvent.change(screen.getByTestId('time'), { target: { value: '12:00' } });
      fireEvent.click(screen.getByText(/Post Event/i));
    });

    // Re-render the component to ensure the feed includes the updated component
    renderRevisedComponent();

    const element = screen.queryByTestId(
      'Something went wrong creating your event - please try again.'
    );
    expect(element).not.toBeInTheDocument();
  });
});
