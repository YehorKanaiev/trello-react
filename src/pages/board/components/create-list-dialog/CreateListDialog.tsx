import { Controller, useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { titleValidation } from './title-validation';

const defaultValues = {
  title: '',
};

export default function CreateListDialog({ isOpen, onCancel, onClose, onSuccess }: DialogProps): React.ReactElement {
  const { handleSubmit, control } = useForm<FormGroup>({ defaultValues });
  const { errors } = useFormState({ control });

  const submitHandler: SubmitHandler<FormGroup> = (data): void => {
    onSuccess(data.title);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle id="dialog-title">Створити список</DialogTitle>
        <DialogContent>
          <section>
            <label>Назва списку</label>
            <Controller
              name="title"
              control={control}
              rules={titleValidation}
              render={(v): React.ReactElement => (
                <TextField
                  label="Заголовок списку"
                  {...v.field}
                  helperText={errors.title?.message}
                  error={!!errors.title}
                />
              )}
            />
          </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Відмінити</Button>
          <Button type="submit" variant="contained" disabled={false} autoFocus>
            Створити
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

interface DialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onClose: () => void;
  onSuccess: (title: string) => void;
}

interface FormGroup {
  title: string;
}
