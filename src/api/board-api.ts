import { IBoard } from '../core/interfaces/board.interface';
import instance from './reqest';

export const boardApi = {
  getBoards(): Promise<IBoard[]> {
    return instance.get<{ boards: IBoard[] }>('board').then((res) => res.data.boards);
  },
};
