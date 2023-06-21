import React from 'react';
import Board from './components/Board';
import s from './Home.module.scss';
import cardStyles from './Card.module.scss';

export default function Home(): React.ReactElement {
  const boards = [
    { id: 1, title: 'покупки', custom: { background: 'red' } },
    { id: 2, title: 'підготовка до весілля', custom: { background: 'green' } },
    { id: 3, title: 'розробка інтернет-магазину', custom: { background: 'blue' } },
    { id: 4, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
  ];
  const bordComponents = boards.map((board) => (
    <Board title={board.title} background={board.custom.background} key={board.id} />
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
