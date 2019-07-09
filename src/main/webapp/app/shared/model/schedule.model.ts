import { Moment } from 'moment';

export interface ISchedule {
  id?: number;
  title?: string;
  dateAndTime?: Moment;
  description?: string;
  taskId?: number;
  postId?: number;
  commentId?: number;
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public title?: string,
    public dateAndTime?: Moment,
    public description?: string,
    public taskId?: number,
    public postId?: number,
    public commentId?: number
  ) {}
}
