import { Moment } from 'moment';

export interface IReminder {
  id?: number;
  date?: Moment;
  time?: Moment;
  taskId?: number;
}

export class Reminder implements IReminder {
  constructor(public id?: number, public date?: Moment, public time?: Moment, public taskId?: number) {}
}
