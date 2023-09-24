import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from '../routes/root';
import ErrorPage from '../routes/error-page';
import { Dashboard } from '../components/dashboard/dashboard';
import { Trade } from '../components/trade/trade';
import { WebSocketDemo } from '../components/config/ws';

const router = createBrowserRouter([
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
]);

export default function RouterConfiguration() {
  return <RouterProvider router={router} />;
}
