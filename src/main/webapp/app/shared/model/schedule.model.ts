import {Moment} from 'moment';

export interface ISchedule {
  id?: number;
  title?: string;
  dateTime?: Moment;
  description?: string;
  taskId?: number;
  postId?: number;
  commentId?: number;
}

export const defaultValue: Readonly<ISchedule> = {};
