import { AppShell, Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { WebsocketContext } from '../store/websocket-provider';
import { Header } from '../components/layouts/header/header';
import { PageLoader } from '../components/shared/page-loader';

const routes = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Trade', link: '/trade' },
  { label: 'WS', link: '/ws' },
  { label: 'Chart', link: '/chart' },
];

export default function Root() {
  const { isSocketReady } = useContext(WebsocketContext);

  if (!isSocketReady) {
    return <PageLoader />;
  }

  return (
    <AppShell header={{ height: { base: 48 } }}>
      <AppShell.Header>
        <Header links={routes} />
      </AppShell.Header>
      <Box mt={48} p={12}>
        <Outlet />
      </Box>
    </AppShell>
  );
}
