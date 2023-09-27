import { AppShell, Box, Loader } from '@mantine/core';
import { Outlet, useSearchParams } from 'react-router-dom';
import { HeaderResponsive } from '../components/layouts/header/header';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { authenticateUser } from '../services/auth';
import { getUserProfile } from '../services/user';
import { Stat } from '../enum/stat';

const routes = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Trade', link: '/trade' },
  { label: 'WS', link: '/ws' },
  { label: 'Chart', link: '/chart' },
];

export default function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestCode = useMemo(() => searchParams.get('code'), [searchParams]);

  const redirectToAuth = useCallback(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    window.location.replace(`${import.meta.env.VITE_AUTH_REDIRECT_URL}${import.meta.env.VITE_API_KEY}`);
  }, []);

  async function OnAuthRedirection() {
    if (requestCode) {
      const response = await authenticateUser(requestCode);
      if (response.stat == Stat.Ok) {
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('userId', response.client);
        onAuthSuccess();
      }
    }
  }

  async function OnAppInit() {
    const token = window.localStorage.getItem('token');
    if (!token && !requestCode) {
      redirectToAuth();
    }

    if (token) {
      console.log('are you comingfin')
      await getUserInfo();
    }
  }

  async function getUserInfo() {
    const userInfo = await getUserProfile();
    if (userInfo.stat === Stat.Ok) {
      setIsAuthenticated(true);
    } else {
      redirectToAuth();
    }
  }

  function onAuthSuccess() {
    setIsAuthenticated(true);
    searchParams.delete('code');
    searchParams.delete('client');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    OnAuthRedirection();
  }, [requestCode]);

  useEffect(() => {
    OnAppInit();
  }, []);

  if (!isAuthenticated) {
    return (
      <Box display={'flex'} style={{ width: '100vw', height: '100vh', justifyContent: 'center' }}>
        <Loader size={30} />
      </Box>
    );
  }

  return (
    <AppShell
      padding="md"
      // navbar={
      //   <Navbar width={{ base: 300 }} height={500} p="xs">
      //     {/* Navbar content */}
      //   </Navbar>
      // }
      header={<HeaderResponsive key={'header'} links={routes} />}
      styles={theme => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: 0,
          paddingTop: 'calc(var(--mantine-header-height, 0px))',
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
