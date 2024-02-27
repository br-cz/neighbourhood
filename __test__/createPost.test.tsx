import React from 'react';
import { MantineProvider } from '@mantine/core';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/home/page';
import { DataProvider } from '@/contexts/DataContext';
import { Visibility } from '@/src/API';
import userEvent from '@testing-library/user-event';


const AppQueries = require('@/src/api/appQueries');

jest.mock('formik', () => ({
    ...jest.requireActual('formik'),
    useFormik: jest.fn().mockImplementation(() => ({
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      values: {
        author: '',
        content: '',
        visibility: Visibility.PUBLIC,
      },
      errors: {},
      touched: {},
      validateForm: jest.fn().mockResolvedValue({
        content: 'Content is required',
      }),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
      getFieldProps: jest.fn().mockImplementation(() => ({
        //name,
        //value: '',
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
                <HomePage />
            </DataProvider>
        </MantineProvider>
    );

describe('Home page - Create Post', () => {
    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    AppQueries.getCurrentCommunity.mockResolvedValue({
        id: '1',
        name: 'Test Community',
      });

    //1.1
    test('Render the initial home page correctly', async () => {
        renderComponent();  
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Feed' } )).toBeInTheDocument();
        });
    });
    
    //1.2
    test('Renders the create post button correctly', async () => {
        renderComponent();
        await waitFor(() => {
            expect(screen.getByText(/New Post.../i)).toBeInTheDocument();
        });
    });
    
    //1.3
    test('Render post drawer when button is clicked', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));
        await waitFor(() => {
            expect(screen.getByTestId(/create-post-drawer/i)).toBeInTheDocument();
        });
    });

    //1.4
    test('Post creation drawer is rendered correctly with the proper fields', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));
        await waitFor(() => {
            expect(screen.getByTestId(/content/i)).toBeInTheDocument();
            expect(screen.getByTestId(/post-button/i)).toBeInTheDocument();
        });
    });

    //1.5
    test('Fields are selectable and change to proper inputted values', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));
        await waitFor(() => {
            userEvent.type(screen.getByTestId(/content/i), 'This is a test post');
            expect(screen.getByTestId(/content/i)).toHaveValue('This is a test post');
        });
    });

    //1.6
    test('Drawer does not close if content is missing', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));

        userEvent.type(screen.getByTestId(/content/i), 'This is a test post');

        await userEvent.click(screen.getByTestId(/post-button/i));

        await waitFor(() => {
            expect(screen.queryByTestId(/content/i)).toBeInTheDocument();

            expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
                expect.objectContaining({
                  title: 'Oops!',
                })
            );
        },
        {
            timeout: 2000,
        });
    });

    //1.7
    test('Drawer does not close if content is too short', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));

        userEvent.type(screen.getByTestId(/content/i), 'Hi');

        await userEvent.click(screen.getByTestId(/post-button/i));

        await waitFor(() => {
            expect(screen.queryByTestId(/content/i)).toBeInTheDocument();

            expect(require('@mantine/notifications').notifications.show).toHaveBeenCalledWith(
                expect.objectContaining({
                  title: 'Oops!',
                })
            );
        },
        {
            timeout: 2000,
        });
    });

    //1.8
    test('Drawer closes if content is valid', async () => {
        renderComponent();
        await userEvent.click(screen.getByText(/New Post.../i));

        userEvent.type(screen.getByTestId(/content/i), 'This is a test post');

        await userEvent.click(screen.getByTestId(/post-button/i));

        await waitFor(() => {
            expect(screen.queryByTestId(/create-post-drawer/i)).not.toBeInTheDocument();
        });
    });

});