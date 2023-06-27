import React from 'react';
import s from './Card.module.scss';

interface CardProps {
  title: string;
}

export default function Card({ title }: CardProps): React.ReactElement {
  return (
    <div className={s.container}>
      <h6 className={s.card_title}>{title}</h6>
    </div>
  );
}
