import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import { DataProvider } from '@/contexts/DataContext';
import CommunitiesPage from "@/app/communities/page";
import { fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

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
    expect(screen.queryByText('Select Your Communities')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('add-community-btn'));
    await waitFor(() => {
        expect(screen.getByText('Select Your Communities')).toBeInTheDocument();
      });
});


//1.3
test('Closes the Community Select Modal Correctly', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('add-community-btn'));

    await waitFor(() => {
       // expect(screen.getByRole('heading', { name: 'My Communities' })).not.toBeInTheDocument();
       expect(screen.getByText('Select Your Communities')).toBeInTheDocument();
      });

    fireEvent.click(screen.getByTestId('cancel-join-community-btn'));

    await waitFor(() => {
        expect(screen.queryByText('Select Your Communities')).not.toBeInTheDocument();
      });
});


//1.4
test('Renders the currently selected community correctly', async () => {
    renderComponent();
    console.log(prettyDOM(screen.getByTestId('community-card')));

    // expect (screen.getByText('Test Community1')).toBeInTheDocument();
    // expect (screen.getByTestId('select-community-btn')).toBeInTheDocument();
    // expect (screen.getByTestId('leave-community-btn')).toBeInTheDocument();
    // await waitFor(() => {
    //    // expect(screen.getByRole('heading', { name: 'My Communities' })).not.toBeInTheDocument();
    //    expect(screen.getByText('Select Your Communities')).toBeInTheDocument();
    //   });

    // fireEvent.click(screen.getByTestId('cancel-join-community-btn'));

    // await waitFor(() => {
    //     expect(screen.queryByText('Select Your Communities')).not.toBeInTheDocument();
    //   });
});



});