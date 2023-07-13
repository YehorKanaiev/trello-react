import { IBoard } from '../core/interfaces/board.interface';
import instance from './reqest';

export interface Response {
  result: string;
  id?: number;
}

export const boardApi = {
  getBoards(): Promise<IBoard[]> {
    return instance.get<{ boards: IBoard[] }>('board').then((res) => res.data.boards);
  },

  getBoard(id: number): Promise<IBoard> {
    return instance.get<IBoard>(`board/${id}`).then((res) => res.data);
  },

  createBoard(title: string): Promise<Response> {
    return instance.post<Response>('board', { title }).then((res) => res.data);
  },

  updateCard(
    card: { id: number; title: string; description?: string },
    listId: number,
    boardId: number
  ): Promise<Response> {
    return instance
      .put<Response>(`board/${boardId}/card/${card.id}`, {
        title: card.title,
        description: card.description,
        list_id: listId,
      })
      .then((res) => res.data);
  },
};
