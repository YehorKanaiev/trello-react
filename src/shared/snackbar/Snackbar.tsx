import * as React from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import { hideSnackbar, selectSnackbar } from '../../store/slices/snackbar-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

export function TrelloSnackbar(): React.ReactElement | null {
  const { snackbar } = useAppSelector(selectSnackbar);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(hideSnackbar());
  };

  if (!snackbar) {
    return null;
  }

  return (
    <Snackbar open anchorOrigin={anchorOrigin} autoHideDuration={snackbar.duration ?? 2000} onClose={handleClose}>
      <Alert sx={{ width: '100%' }} severity={snackbar.type} onClose={handleClose}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
