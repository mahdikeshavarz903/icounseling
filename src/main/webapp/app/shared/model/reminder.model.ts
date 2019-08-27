import {Moment} from 'moment';

export interface IReminder {
  id?: number;
  dateTime?: Moment;
  taskId?: number;
}

export const defaultValue: Readonly<IReminder> = {};
