import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Popover } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import s from './MoveCardPopover.module.scss';
import { TrelloTextField } from '../../../../shared/TrelloTextField';
import { boardApi } from '../../../../api/board-api';
import { IBoard } from '../../../../core/interfaces/board.interface';
import { IList } from '../../../../core/interfaces/list.interface';

interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function MoveCardPopover({ open, anchorEl, onClose }: PopoverProps): React.ReactElement {
  const { control, watch, reset } = useForm<MoveForm>();
  const { isValid } = useFormState({ control });
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [board, setBoard] = useState<IBoard | null>(null);
  const [lists, setLists] = useState<IList[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  const fetchBoards = async (): Promise<void> => {
    const fetchedBoards = await boardApi.getBoards();
    setBoards(fetchedBoards);
  };

  const fetchLists = (id: number): Promise<IBoard> => boardApi.getBoard(id);

  const moveCardHandler = (): void => {
    reset();
    onClose();
  };

  useEffect((): void => {
    fetchBoards().catch((err): void => console.error(err));
  }, []);

  useEffect(() => {
    const boardSubscription = watch((value, { name }): void => {
      if (name === 'board') {
        setBoard((value.board as IBoard) ?? null);
      }

      if (name === 'list') {
        if (value.list && value.list.cards?.length) {
          const positionsSubsequence = Array.from({ length: value.list.cards.length + 1 }, (_, i) => i + 1);
          setPositions(positionsSubsequence);
        } else {
          setPositions([]);
        }
      }
    });

    return () => boardSubscription.unsubscribe();
  }, [watch]);

  useEffect((): void => {
    if (board) {
      fetchLists(board.id)
        .then((fetchedBoard) => {
          setLists(fetchedBoard.lists);
        })
        .catch((err): void => console.error(err));
    } else {
      setLists([]);
    }
  }, [board]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      onClose={onClose}
    >
      <div className={s.container}>
        <h4 className={s.title}>Перемістити картку</h4>

        <Controller
          render={({ field: { onChange, ref, ...field } }): React.ReactElement => (
            <Autocomplete
              className={s.autocomplete}
              options={boards}
              autoHighlight
              getOptionLabel={(option): string => option.title}
              onChange={(_, data): void => onChange(data)}
              renderOption={(props, option): React.ReactElement => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.title}
                </Box>
              )}
              renderInput={(params): React.ReactElement => (
                <TrelloTextField
                  label="Дошка"
                  {...field}
                  {...params}
                  inputRef={ref}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
          name="board"
          control={control}
          rules={{ required: `Обов'язкове поле` }}
        />
        <Controller
          render={({ field: { onChange, ref, ...field } }): React.ReactElement => (
            <Autocomplete
              className={s.autocomplete}
              options={lists}
              autoHighlight
              getOptionLabel={(option): string => option.title}
              onChange={(_, data): void => onChange(data)}
              renderOption={(props, option): React.ReactElement => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.title}
                </Box>
              )}
              renderInput={(params): React.ReactElement => (
                <TrelloTextField
                  label="Список"
                  {...field}
                  {...params}
                  inputRef={ref}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
          name="list"
          control={control}
          rules={{ required: `Обов'язкове поле` }}
        />

        <Controller
          render={({ field: { onChange, ref, ...field } }): React.ReactElement => (
            <Autocomplete
              className={s.autocomplete}
              options={positions}
              autoHighlight
              getOptionLabel={(option): string => option.toString()}
              onChange={(_, data): void => onChange(data ?? 0)}
              renderOption={(props, option): React.ReactElement => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option}
                </Box>
              )}
              renderInput={(params): React.ReactElement => (
                <TrelloTextField
                  {...field}
                  {...params}
                  inputRef={ref}
                  label="Позиція"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
          name="position"
          control={control}
          rules={{ required: `Обов'язкове поле` }}
        />

        <div className={s.dialog_controls}>
          <Button variant="contained" onClick={moveCardHandler} disabled={!isValid}>
            Перемістити
          </Button>
        </div>
      </div>
    </Popover>
  );
}

interface MoveForm {
  board: IBoard | null;
  list: IList | null;
  position: number | null;
}
