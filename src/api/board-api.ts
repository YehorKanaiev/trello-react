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
};
