import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './pages/home/Home';
import ErrorPage from './pages/error/ErrorPage';
import Board, { boardLoader } from './pages/board/Board';
import BoardRoutes from './pages/board/board-routes';

export const router = createBrowserRouter([
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
