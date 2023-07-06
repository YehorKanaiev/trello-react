import { Params } from 'react-router-dom';
import { IBoard } from '../../core/interfaces/board.interface';
import { boardApi } from '../../api/board-api';

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
