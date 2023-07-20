import * as React from 'react';
import { LinearProgress } from '@mui/material';
import { selectLoader } from '../../store/slices/loader-slice';
import c from './Loader.module.scss';
import { useAppSelector } from '../../store/hooks';

export function Loader(): React.ReactElement | null {
  const loaderState = useAppSelector(selectLoader);

  if (!loaderState.loading) {
    return null;
  }

  return (
    <div className={c.loader_wrapper}>
      <LinearProgress />
    </div>
  );
}
