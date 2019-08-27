export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  visitorId?: number;
}

export const defaultValue: Readonly<IJob> = {};
