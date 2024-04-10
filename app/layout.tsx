import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import ConfigureAmplifyClientSide from '@/src/components/ConfigureAmplify';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from '../theme';
import { DataProvider } from '@/src/contexts/DataContext';

export const metadata = {
  title: 'neighbourhood - your community at your fingertips',
  description:
    'Neighbourhood is a community platform that allows you to connect with your neighbours and local community. Its a place to spark discussion, host events, and build relationships through proximity.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigureAmplifyClientSide />
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider
            modalProps={{
              radius: 'md',
            }}
          >
            <DataProvider>{children}</DataProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
