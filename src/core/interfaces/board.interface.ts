import { IList } from './list.interface';

export interface IBoard {
  id: number;
  title: string;
  lists: IList[];
  custom?: {
    [key: string]: string;
  };
}
