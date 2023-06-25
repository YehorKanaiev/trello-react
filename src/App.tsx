import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import ErrorPage from './pages/error/ErrorPage';
import BoardRoutes from './pages/board/board-routes';
import Board, { boardLoader } from './pages/board/Board';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/board/:id',
    element: <Board />,
    errorElement: <ErrorPage />,
    loader: boardLoader,
    children: BoardRoutes,
  },
]);

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
