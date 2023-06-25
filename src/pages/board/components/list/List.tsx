import React from 'react';
import { ICard } from '../../../../core/interfaces/card.interface';
import s from './List.module.scss';
import Card from '../card/Card';

interface ListProps {
  title: string;
  cards: ICard[];
}

export default function List({ title, cards }: ListProps): React.ReactElement {
  const tasks = cards.map((card) => (
    <div className={s.card} key={card.id}>
      <Card title={card.title} />
    </div>
  ));

  return (
    <div className={s.list_container}>
      <div>
        <h4>{title}</h4>
      </div>
      <div className={s.cards_container}>{tasks}</div>
      <div className={s.footer}>
        <div className={s.add_card_button}>Додати картку</div>
      </div>
    </div>
  );
}
