import {Moment} from 'moment';

export interface ISchedule {
  id?: number;
  title?: string;
  date?: Moment;
  time?: Moment;
  description?: string;
  taskId?: number;
  postId?: number;
  commentId?: number;
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public title?: string,
    public date?: Moment,
    public time?: Moment,
    public description?: string,
    public taskId?: number,
    public postId?: number,
    public commentId?: number
  ) {}
}
