import React from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import List from './components/list/List';
import s from './Board.module.scss';
import { IBoard } from '../../core/interfaces/board.interface';
import { boardApi } from '../../api/board-api';

export default function Board(): React.ReactElement {
  const { board } = useLoaderData() as { board: IBoard };
  const lists = board.lists.map((list) => (
    <div className={s.list} key={list.id}>
      <List title={list.title} cards={list.cards} />
    </div>
  ));

  return (
    <div className={s.board_container}>
      <div>
        <div className={s.back_button} />
      </div>
      <h2>{board.title}</h2>
      <div className={s.lists_container}>
        {lists}
        <div className={s.create_list_button}>Додати список</div>
      </div>
    </div>
  );
}

export async function boardLoader({ params }: { params: Params }): Promise<{ board: IBoard }> {
  const { id } = params;
  if (!id) {
    return Promise.reject(new Error('Board id parameter missing in URL'));
  }

  const idNumber = Number(id);
  if (Number.isNaN(idNumber)) {
    return Promise.reject(new Error('Invalid board id'));
  }

  const board = await boardApi.getBoard(idNumber);

  return { board };
}
