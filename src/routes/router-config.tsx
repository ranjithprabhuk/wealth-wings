import React, { Suspense, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from '../routes/root';
import { Loader } from '@mantine/core';
import Authentication from './authentication';
import { TradeProvider } from '../store/trade-provider';
import { Login } from '../components/auth/zerodha/login';

// LAZY ROUTES
const ErrorPage = React.lazy(() => import('../routes/error-page'));
const Dashboard = React.lazy(() => import('../components/dashboard/dashboard'));
const Trade = React.lazy(() => import('../components/trade/trade'));
const WebSocketDemo = React.lazy(() => import('../components/config/ws'));

export default function RouterConfiguration() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: (
            <Suspense fallback={<Loader />}>
              <Authentication>
                <Root />
              </Authentication>
            </Suspense>
          ),
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/dashboard',
              element: (
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              ),
              errorElement: <ErrorPage />,
            },
            {
              path: '/trade',
              element: (
                <Suspense fallback={<Loader />}>
                  <TradeProvider>
                    <Trade />
                  </TradeProvider>
                </Suspense>
              ),
              errorElement: <ErrorPage />,
            },
            {
              path: '/auth',
              element: (
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              ),
              errorElement: <ErrorPage />,
            },
            {
              path: '/ws',
              element: (
                <Suspense fallback={<Loader />}>
                  <WebSocketDemo />
                </Suspense>
              ),
              errorElement: <ErrorPage />,
            },
          ],
        },
      ]),
    [],
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />{' '}
    </Suspense>
  );
}
