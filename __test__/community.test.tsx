import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/src/contexts/DataContext';
import CommunitiesPage from '@/src/components/Communities/CommunitiesPage';
import { fireEvent } from '@testing-library/react';

const renderComponent = () =>
  render(
    <MantineProvider>
      <DataProvider>
        <CommunitiesPage />
      </DataProvider>
    </MantineProvider>
  );

describe('Communities Page', () => {
  //1.1
  test('Renders the initial Communities page correctly', async () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'My Communities' })).toBeInTheDocument();
  });

  //1.2
  test('Renders the Community Select Modal Correctly', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
    });
  });

  //1.3
  test('Renders the Community Select Join Button Correctly', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('join-community-btn')).toBeInTheDocument();
    });
  });

  //1.4
  test('Renders the Community Select Cancel Button Correctly', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('cancel-join-community-btn')).toBeInTheDocument();
    });
  });
  //1.5
  test('Does not render joined community in Community Select Modal', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
      expect(screen.queryByText('Community Location1')).not.toBeInTheDocument();
    });
  });

  //1.6
  test('Renders the Second Test Community', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
      expect(screen.getByText('Community Location2')).toBeInTheDocument();
    });
  });

  //1.7
  test('Renders the Third Test Community', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
      expect(screen.getByText('Community Location3')).toBeInTheDocument();
    });
  });

  //1.8
  test('Community Select Modal Closes on Valid Selection', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('communities-item-community2'));
    fireEvent.click(screen.getByTestId('join-community-btn'));

    //It should close after selection
    await waitFor(() => {
      expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    });
  });

  //1.9
  test('Community Card Rendered After Valid Selection', async () => {
    renderComponent();
    expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('communities-item-community2'));
    fireEvent.click(screen.getByTestId('join-community-btn'));

    //It should close after selection
    await waitFor(
      () => {
        expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
        expect(screen.getByTestId('community-card')).toBeInTheDocument();
      },

      { timeout: 3000 }
    );
  });

  //1.10
  test('Closes the Community Select Modal Correctly', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('add-community-btn'));

    await waitFor(() => {
      // expect(screen.getByRole('heading', { name: 'My Communities' })).not.toBeInTheDocument();
      expect(screen.getByText('Join a Community')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('cancel-join-community-btn'));

    await waitFor(() => {
      expect(screen.queryByText('Join a Community')).not.toBeInTheDocument();
    });
  });
});
