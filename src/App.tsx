import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useGlobalTheme } from './theme/default-theme';
import RouterConfiguration from './routes/router-config';

export default function App() {
  return (
    <React.StrictMode>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={useGlobalTheme('light')}>
        <RouterConfiguration />
      </MantineProvider>
    </React.StrictMode>
  );
}
