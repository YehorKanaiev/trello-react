import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth-slice';

interface Props {
  children: React.ReactElement;
}

export function AuthenticationGuard({ children }: Props): React.ReactElement | null {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector(selectAuth);

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}
