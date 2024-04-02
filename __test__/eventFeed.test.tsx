/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MantineProvider } from '@mantine/core';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import EventsPage from '@/components/Events/EventsPage';

const userHooks = require('@/src/hooks/usersCustomHooks');

const mockData = {
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

jest.mock('@/src/hooks/eventsCustomHooks', () => ({
  useFetchEvents: jest.fn(() => ({
    ...mockData,
    refetch: jest.fn(),
  })),
  useCreateEvent: jest.fn(() => ({
    createEvent: jest.fn(),
  })),
  useEventSaves: jest.fn(() => ({
    saveEvent: jest.fn(),
    unsaveEvent: jest.fn(),
  })),
  useUserEventSaves: jest.fn(() => ({
    userEventSaves: {
      get: () => false,
    },
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <EventsPage />
      </DataProvider>
    </MantineProvider>
  );

describe('Events Page', () => {
  userHooks.getCurrentUser.mockResolvedValue({
    id: '10',
    email: 'user@email.com',
    _version: 1,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1.1
  test('Renders the initial Events page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'Events' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the Event feed component correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId('event-feed')).toBeInTheDocument();
    });
  });

  //1.3
  test('Renders an array of Event Cards correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('event-card').length).toBeGreaterThan(0);
    });
  });

  //1.4
  test('Renders an appropriate # of event cards to events in the community', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByTestId('event-card').length).toBe(mockData.events.length);
    });
  });

  test('Renders event card content correctly', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Pizza Party')).toBeInTheDocument();
      expect(screen.getByText('1234 Pizza St')).toBeInTheDocument();
      expect(screen.getByText('Bojangle Williams')).toBeInTheDocument();
      expect(screen.getByText('December 12, 2022')).toBeInTheDocument();
      expect(screen.getByText('7:00 PM')).toBeInTheDocument();
      expect(screen.getAllByText('View').length).toBeGreaterThan(0);
    });
  });

  test('Event cards can be viewed to see additional details', async () => {
    renderComponent();
    expect(screen.queryByTestId('view-event-modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText('View')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('view-event-modal')).toBeInTheDocument();
    });
  });

  test('Event cards close properly after having their modal opened', async () => {
    renderComponent();
    expect(screen.queryByTestId('view-event-modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText('View')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('view-event-modal')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
    const closeButton = screen.getByLabelText('Close Modal');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });
  });
});
