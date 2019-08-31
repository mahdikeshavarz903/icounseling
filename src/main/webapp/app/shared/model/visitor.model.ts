import { ITransaction } from 'app/shared/model/transaction.model';
import { IJob } from 'app/shared/model/job.model';

export interface IVisitor {
  id?: number;
  scoreId?: number;
  educationId?: number;
  userId?: number;
  transactions?: ITransaction[];
  jobs?: IJob[];
  counselingCaseId?: number;
  libraryId?: number;
}

export const defaultValue: Readonly<IVisitor> = {};
