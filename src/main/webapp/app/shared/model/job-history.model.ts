import { Moment } from 'moment';

export interface IJobHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  jobId?: number;
}

export class JobHistory implements IJobHistory {
  constructor(public id?: number, public startDate?: Moment, public endDate?: Moment, public jobId?: number) {}
}
