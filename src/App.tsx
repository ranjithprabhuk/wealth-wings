import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useGlobalTheme } from './theme/default-theme';
import RouterConfiguration from './routes/router-config';
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider theme={useGlobalTheme('light')}>
      <RouterConfiguration />
    </MantineProvider>
  );
}
