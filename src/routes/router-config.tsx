import React, { Suspense, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from '../routes/root';
import { Loader } from '@mantine/core';
// import ErrorPage from '../routes/error-page';
// import { Dashboard } from '../components/dashboard/dashboard';
// import { Trade } from '../components/trade/trade';
// import { WebSocketDemo } from '../components/config/ws';

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
              <Root />
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
                  <Trade />
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
