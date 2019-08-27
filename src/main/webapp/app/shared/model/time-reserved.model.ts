import {Moment} from 'moment';

export interface ITimeReserved {
  id?: number;
  date?: Moment;
  time?: Moment;
  description?: string;
  counselorId?: number;
}

export class TimeReserved implements ITimeReserved {
  constructor(public id?: number, public date?: Moment, public time?: Moment, public description?: string, public counselorId?: number) {
  }
}
