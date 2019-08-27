import {Moment} from 'moment';
import {ITask} from 'app/shared/model/task.model';

export interface IPlanning {
  id?: number;
  title?: string;
  startDate?: Moment;
  startTime?: Moment;
  endDate?: Moment;
  endTime?: Moment;
  description?: string;
  tasks?: ITask[];
  counselorId?: number;
}

export class Planning implements IPlanning {
  constructor(
    public id?: number,
    public title?: string,
    public startDate?: Moment,
    public startTime?: Moment,
    public endDate?: Moment,
    public endTime?: Moment,
    public description?: string,
    public tasks?: ITask[],
    public counselorId?: number
  ) {
  }
}
