import { Moment } from 'moment';

export interface ITimeReserved {
  id?: number;
  date?: Moment;
  description?: string;
  time?: Moment;
  counselorId?: number;
}

export class TimeReserved implements ITimeReserved {
  constructor(public id?: number, public date?: Moment, public description?: string, public time?: Moment, public counselorId?: number) {}
}
