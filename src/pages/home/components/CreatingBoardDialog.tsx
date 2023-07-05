import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useInput from '../../../core/hooks/use-input';
import s from './CreatingBoardDialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onClose: () => void;
  onSuccess: (title: string) => void;
}

export default function CreatingBoardDialog({ isOpen, onCancel, onClose, onSuccess }: DialogProps): React.ReactElement {
  const titleInput = useInput<string>('', { Required: true, MinLength: 3, MaxLength: 8 });
  const titleInputError = titleInput.errors ? Object.values(titleInput.errors)[0] : '';

  const handleCreateClick = (): void => {
    onSuccess(titleInput.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <DialogTitle id="dialog-title">Створити дошку</DialogTitle>
      <DialogContent>
        <input
          name="board-title"
          type="text"
          placeholder="Введіть назву дошки"
          value={titleInput.value}
          onChange={(e): void => titleInput.onChange(e.target.value)}
          onBlur={titleInput.onBlur}
        />
        {titleInput.errors && <p className={s.validation_error}>{titleInputError}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Відмінити</Button>
        <Button disabled={!titleInput.isValid} onClick={handleCreateClick} autoFocus>
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
}
