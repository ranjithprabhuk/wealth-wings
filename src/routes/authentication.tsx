import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { authenticateUser } from '../services/auth';
import { getUserProfile } from '../services/user';
import { Stat } from '../enum/stat';
import { WebsocketProvider } from '../store/websocket-provider';
import { removeLocalStorageValue } from '../utils/localStorage/removeLocalStorageValue';
import { setLocalStorageValue } from '../utils/localStorage/setLocalStorageValue';
import { getLocalStorageValue } from '../utils/localStorage/getLocalStorageValue';
import { PageLoader } from '../components/shared/page-loader';

export default function Authentication(props) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const requestCode = useMemo(() => searchParams.get('code'), [searchParams]);

  const redirectToAuth = useCallback(() => {
    removeLocalStorageValue('token');
    removeLocalStorageValue('userId');
    window.location.replace(`${import.meta.env.VITE_AUTH_REDIRECT_URL}${import.meta.env.VITE_API_KEY}`);
  }, []);

  async function OnAuthRedirection() {
    if (requestCode) {
      const response = await authenticateUser(requestCode);
      if (response.stat == Stat.Ok) {
        setLocalStorageValue('token', response.token);
        setLocalStorageValue('userId', response.client);
        onAuthSuccess();
      }
    }
  }

  async function OnAppInit() {
    const token = getLocalStorageValue('token');
    if (!token && !requestCode) {
      redirectToAuth();
    }

    if (token) {
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
    return <PageLoader />;
  }

  return (
    <WebsocketProvider>
      {location && location.pathname === '/' && <Navigate to="/dashboard" />}
      {props.children}
    </WebsocketProvider>
  );
}
