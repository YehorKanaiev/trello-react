import React from 'react';
import { useLoaderData } from 'react-router-dom';
import List from './components/list/List';
import s from './Board.module.scss';
import { IBoard } from '../../core/interfaces/board.interface';

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

const boardStub: IBoard = {
  id: 0,
  title: 'Моя тестова дошка',
  lists: [
    {
      id: 1,
      title: 'Плани',
      cards: [
        { id: 1, title: 'вимити кота' },
        { id: 2, title: 'приготувати суп' },
        { id: 3, title: 'сходити в магазин' },
      ],
    },
    {
      id: 2,
      title: 'В процесі',
      cards: [{ id: 4, title: 'подивитись серіал' }],
    },
    {
      id: 3,
      title: 'Зроблено',
      cards: [
        { id: 5, title: 'зробити домашку' },
        { id: 6, title: 'вигуляти собаку' },
      ],
    },
  ],
};

export async function boardLoader(): Promise<{ board: IBoard }> {
  // export async function boardLoader({ params }: { params: Params }): Promise<{ board: IBoard }> {
  // const board = await getBoard(params.id);
  const board = await Promise.resolve(boardStub);

  return { board };
}
