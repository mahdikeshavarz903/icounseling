import { ITask } from 'app/shared/model/task.model';

export interface IPlanning {
  id?: number;
  tasks?: ITask[];
  counselorId?: number;
}

export class Planning implements IPlanning {
  constructor(public id?: number, public tasks?: ITask[], public counselorId?: number) {}
}
