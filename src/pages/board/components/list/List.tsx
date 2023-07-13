import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICard } from '../../../../core/interfaces/card.interface';
import s from './List.module.scss';
import Card from '../card/Card';
import EditCardDialog from '../edit-card/EditCardDialog';

interface ListProps {
  id: number;
  title: string;
  cards: ICard[];
}

export default function List({ id, title, cards }: ListProps): React.ReactElement {
  const [isCardEdited, setCardEdited] = useState<boolean>(false);
  const [cardToEdit, setCardToEdit] = useState<ICard | null>(null);
  const boardId = Number(useParams().id as string);

  const openCardEditDialog = (c: ICard): void => {
    setCardToEdit(c);
    setCardEdited(true);
  };

  const closeCardEdit = (): void => {
    setCardEdited(false);
  };

  const cardEditedHandler = (): void => {
    setCardEdited(false);
    // TODO fetch updated board;
  };

  const tasks = cards.map((card) => (
    <div className={s.card} key={card.id} onClick={(): void => openCardEditDialog(card)}>
      <Card title={card.title} />
    </div>
  ));

  return (
    <>
      <div className={s.list_container}>
        <div>
          <h4>{title}</h4>
        </div>
        <div className={s.cards_container}>{tasks}</div>
        <div className={s.footer}>
          <div className={s.add_card_button}>Додати картку</div>
        </div>
      </div>
      {cardToEdit && isCardEdited && (
        <EditCardDialog
          card={cardToEdit}
          boardId={boardId}
          listId={id}
          isOpen={isCardEdited}
          onCancel={closeCardEdit}
          onClose={closeCardEdit}
          onSuccess={cardEditedHandler}
        />
      )}
    </>
  );
}
