import React, { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from '../routes/root';
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
          element: <Root />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
              errorElement: <ErrorPage />,
            },
            {
              path: '/trade',
              element: <Trade />,
              errorElement: <ErrorPage />,
            },
            {
              path: '/ws',
              element: <WebSocketDemo />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ]),
    [],
  );
  
  return <RouterProvider router={router} />;
}
