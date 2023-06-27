import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import s from './Home.module.scss';
import cardStyles from './Card.module.scss';
import { IBoard } from '../../core/interfaces/board.interface';
import { boardApi } from '../../api/board-api';
import CreatingBoardDialog from './components/CreatingBoardDialog';

export default function Home(): React.ReactElement {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isCreatingDialogOpen, setCreatingDialogOpen] = useState<boolean>(false);

  const bordComponents = boards.map((board) => (
    <Board id={board.id} title={board.title} background={board.custom?.background ?? '#eee'} key={board.id} />
  ));

  const fetchBoards = async (): Promise<void> => {
    const b = await boardApi.getBoards();
    setBoards(b);
  };

  useEffect(() => {
    fetchBoards().catch((err) => console.error(err));
  }, []);

  const openCreateBoardDialog = (): void => setCreatingDialogOpen(true);

  const handleCreatingDialogClose = (): void => setCreatingDialogOpen(false);

  const createBoard = (title: string): void => {
    boardApi
      .createBoard(title)
      .then(() => setCreatingDialogOpen(false))
      .then(() => fetchBoards())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className={s.home_container}>
        <h3 className={s.page_title}>Moї дошки</h3>
        <div className={s.boards}>
          {bordComponents}
          <div className={`${cardStyles.card} ${s.create_board_button}`} onClick={openCreateBoardDialog}>
            <span className={s.button_content}>+</span>
          </div>
        </div>
      </div>
      <CreatingBoardDialog
        isOpen={isCreatingDialogOpen}
        onCancel={handleCreatingDialogClose}
        onClose={handleCreatingDialogClose}
        onSuccess={(title): void => createBoard(title)}
      />
    </>
  );
}
