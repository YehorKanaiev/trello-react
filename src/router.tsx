import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from 'pages/home/Home';
import ErrorPage from 'pages/error/ErrorPage';
import Board from 'pages/board/Board';
import BoardRoutes from 'pages/board/board-routes';
import { boardLoader } from 'pages/board/board-loader';
import { SignIn } from 'pages/sign-in/SignIn';
import { AuthenticationGuard } from 'core/guards/AuthenticationGuard';
import SignUp from 'pages/sign-up/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthenticationGuard>
        <Home />
      </AuthenticationGuard>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/board/:id',
    element: (
      <AuthenticationGuard>
        <Board />
      </AuthenticationGuard>
    ),
    errorElement: <ErrorPage />,
    loader: boardLoader,
    children: BoardRoutes,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
]);
