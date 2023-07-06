import { Controller, useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { titleValidation } from './title-validation';
import s from './CreateListDialog.module.scss';
import { TrelloTextField } from '../../../../shared/TrelloTextField';

const defaultValues = {
  title: '',
};

export default function CreateListDialog({ isOpen, onCancel, onClose, onSuccess }: DialogProps): React.ReactElement {
  const { handleSubmit, control } = useForm<FormGroup>({ defaultValues });
  const { errors, isValid, isSubmitted } = useFormState({ control });

  const submitHandler: SubmitHandler<FormGroup> = (data): void => {
    onSuccess(data.title);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle id="dialog-title">Створити список</DialogTitle>
        <DialogContent>
          <section className={s.form_section}>
            <Controller
              name="title"
              control={control}
              rules={titleValidation}
              render={(v): React.ReactElement => (
                <TrelloTextField
                  className={s.title_input}
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
          <Button type="submit" variant="contained" disabled={isSubmitted && !isValid} autoFocus>
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
