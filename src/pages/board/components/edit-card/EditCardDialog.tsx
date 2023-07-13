import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Controller, SubmitHandler, useForm, useFormState, ValidateResult } from 'react-hook-form';
import s from './EditCardDialog.module.scss';
import { titleValidation } from '../create-list-dialog/title-validation';
import { TrelloTextField } from '../../../../shared/TrelloTextField';
import MoveCardPopover from '../move-card-popover/MoveCardPopover';
import { ICard } from '../../../../core/interfaces/card.interface';
import { boardApi } from '../../../../api/board-api';

export default function EditCardDialog({
  card,
  isOpen,
  boardId,
  listId,
  onCancel,
  onClose,
  onSuccess,
}: DialogProps): React.ReactElement {
  const { register, handleSubmit, control, reset } = useForm<CardForm>({
    defaultValues: {
      title: card.title,
      description: card.description,
    },
  });
  const { errors, isValid, isSubmitted } = useFormState({ control });
  const moveCardButtonRef = useRef<HTMLButtonElement>(null);
  const [moveCardAnchor, setMoveCardAnchor] = useState<HTMLElement | null>(null);
  const moveCardPopoverOpen = Boolean(moveCardAnchor);

  const submitHandler: SubmitHandler<CardForm> = (data): void => {
    const updateCard = {
      ...data,
      id: card.id,
    };
    boardApi.updateCard(updateCard, listId, boardId).then(() => {
      reset();
      onSuccess();
    });
  };

  const handlePopoverOpen = (): void => {
    setMoveCardAnchor(moveCardButtonRef.current);
  };

  const handlePopoverClose = (): void => {
    setMoveCardAnchor(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle id="dialog-title">Редагувати картку</DialogTitle>
        <DialogContent className={s.content}>
          <section className={s.form_section}>
            <div className={s.text_field_wrapper}>
              <Controller
                name="title"
                control={control}
                rules={titleValidation}
                render={(v): React.ReactElement => (
                  <TrelloTextField
                    className={s.text_field}
                    label="Заголовок картки"
                    {...v.field}
                    helperText={errors.title?.message}
                    error={!!errors.title}
                  />
                )}
              />
            </div>

            <div className={s.text_field_wrapper}>
              <TrelloTextField
                className={s.text_field}
                label="Опис"
                multiline
                helperText={errors.description?.message}
                error={!!errors.description}
                {...register('description', {
                  minLength: {
                    value: 5,
                    message: 'Опис повинен бути довшим 4 симоволів',
                  },
                  validate: (v: string | undefined): ValidateResult => {
                    if (v && v.length > 120) {
                      return 'Опис не повинен бути довшим 120 символів';
                    }

                    return true;
                  },
                })}
              />
            </div>
          </section>

          <section className={s.control_section}>
            <Button variant="outlined" size="small" ref={moveCardButtonRef} onClick={handlePopoverOpen}>
              Перемістити
            </Button>
            <MoveCardPopover open={moveCardPopoverOpen} anchorEl={moveCardAnchor} onClose={handlePopoverClose} />
          </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Відмінити</Button>
          <Button type="submit" variant="contained" disabled={isSubmitted && !isValid} autoFocus>
            Зберегти
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

interface DialogProps {
  card: ICard;
  isOpen: boolean;
  boardId: number;
  listId: number;
  onCancel: () => void;
  onClose: () => void;
  onSuccess: () => void;
}

interface CardForm {
  title: string;
  description?: string;
}
