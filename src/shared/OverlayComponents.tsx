import * as React from 'react';
import { Loader } from './loader/Loader';
import { TrelloSnackbar } from './snackbar/Snackbar';

export function OverlayComponents(): React.ReactElement {
  return (
    <>
      <Loader />
      <TrelloSnackbar />
    </>
  );
}
