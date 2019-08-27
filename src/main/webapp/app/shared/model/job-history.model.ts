import {Moment} from 'moment';

export interface IJobHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  jobId?: number;
}

export const defaultValue: Readonly<IJobHistory> = {};
