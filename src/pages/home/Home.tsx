import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import s from './Home.module.scss';
import cardStyles from './Card.module.scss';
import { IBoard } from '../../core/interfaces/board.interface';
import { boardApi } from '../../api/board-api';

export default function Home(): React.ReactElement {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const fetchBoards = async (): Promise<void> => {
    const b = await boardApi.getBoards();
    setBoards(b);
  };

  useEffect(() => {
    fetchBoards().catch((err) => console.error(err));
  }, []);

  const bordComponents = boards.map((board) => (
    <Board id={board.id} title={board.title} background={board.custom?.background ?? '#eee'} key={board.id} />
  ));

  return (
    <div className={s.home_container}>
      <h3 className={s.page_title}>Moї дошки</h3>
      <div className={s.boards}>
        {bordComponents}
        <div className={s.create_board_button}>
          <span className={`${cardStyles.card}} button-content`}>+ Створити дошку</span>
        </div>
      </div>
    </div>
  );
}
