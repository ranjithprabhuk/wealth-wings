import { Navigate, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { authenticateUser } from '../services/auth';
import { getUserProfile } from '../services/user';
import { Stat } from '../enum/stat';
import { WebsocketProvider } from '../store/websocket-provider';
import { removeLocalStorageValue } from '../utils/localStorage/removeLocalStorageValue';
import { setLocalStorageValue } from '../utils/localStorage/setLocalStorageValue';
import { getLocalStorageValue } from '../utils/localStorage/getLocalStorageValue';
import { PageLoader } from '../components/shared/page-loader';
import { FyersService } from '../services/fyers/fyers-service';

export default function Authentication(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const requestCode = useMemo(() => searchParams.get('code'), [searchParams]);
  const authCode = useMemo(() => searchParams.get('auth_code'), [searchParams]);

  const redirectToAuth = useCallback(() => {
    removeLocalStorageValue('token');
    removeLocalStorageValue('userId');
    removeLocalStorageValue('fyers-access-token');
    window.location.replace(`${import.meta.env.VITE_AUTH_REDIRECT_URL}${import.meta.env.VITE_API_KEY}`);
  }, []);

  async function OnAuthRedirection() {
    if (requestCode && requestCode !== '200') {
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

  async function onFyersAuthSuccess() {
    if (authCode) {
      if (window.location.hostname !== 'localhost') {
        window.location.href = 'http://localhost:5173?auth_code=' + authCode;
      } else {
        const accessToken = await FyersService.generateAccessToken(authCode);
        console.log('accessToken', accessToken);
        setLocalStorageValue('fyers-access-token', accessToken);
        navigate('/trade');
      }
    }
  }

  useEffect(() => {
    OnAuthRedirection();
  }, [requestCode]);

  useEffect(() => {
    onFyersAuthSuccess();
  }, [authCode]);

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
