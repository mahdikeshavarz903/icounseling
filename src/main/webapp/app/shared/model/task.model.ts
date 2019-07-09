export const enum RepeatTime {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export const enum RepeatUntil {
  NO_END_DATE = 'NO_END_DATE',
  SET_END_DATE = 'SET_END_DATE',
  SET_NUMBER_OF_TIMES = 'SET_NUMBER_OF_TIMES'
}

export interface ITask {
  id?: number;
  repeatTime?: RepeatTime;
  repeatUntil?: RepeatUntil;
  reminderId?: number;
  scheduleId?: number;
  planningId?: number;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public repeatTime?: RepeatTime,
    public repeatUntil?: RepeatUntil,
    public reminderId?: number,
    public scheduleId?: number,
    public planningId?: number
  ) {}
}
