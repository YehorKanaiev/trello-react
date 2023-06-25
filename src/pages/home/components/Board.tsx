import React from 'react';
import { Link } from 'react-router-dom';
import boardStyles from './Board.module.scss';
import cardStyles from '../Card.module.scss';

interface BoardProps {
  id: number;
  title: string;
  background: string;
}

export default function Board({ id, title, background }: BoardProps): React.ReactElement {
  return (
    <div className={`${cardStyles.card} ${boardStyles.board}`} style={{ background }}>
      <Link className={boardStyles.board_link} to={`/board/${id}`}>
        {title}
      </Link>
    </div>
  );
}
