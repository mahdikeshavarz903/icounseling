import { Moment } from 'moment';

export interface ITimeReserved {
  id?: number;
  dateTime?: Moment;
  description?: string;
  counselorId?: number;
}

export const defaultValue: Readonly<ITimeReserved> = {};
