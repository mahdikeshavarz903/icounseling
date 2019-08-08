import {ITransaction} from 'app/shared/model/transaction.model';
import {IJob} from 'app/shared/model/job.model';

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

export class Visitor implements IVisitor {
  constructor(
    public id?: number,
    public scoreId?: number,
    public educationId?: number,
    public userId?: number,
    public transactions?: ITransaction[],
    public jobs?: IJob[],
    public counselingCaseId?: number,
    public libraryId?: number
  ) {}
}
