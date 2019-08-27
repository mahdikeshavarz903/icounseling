import {Moment} from 'moment';
import {ITask} from 'app/shared/model/task.model';

export interface IPlanning {
  id?: number;
  title?: string;
  startDateTime?: Moment;
  endDateTime?: Moment;
  description?: string;
  tasks?: ITask[];
  counselorId?: number;
}

export const defaultValue: Readonly<IPlanning> = {};
