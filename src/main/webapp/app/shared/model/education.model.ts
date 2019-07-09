import { IReseume } from 'app/shared/model/reseume.model';

export const enum EducationDegree {
  ASSOCIATE_DEGREE = 'ASSOCIATE_DEGREE',
  BACHELOR_DEGREE = 'BACHELOR_DEGREE',
  DOCOTRAL_DEGREE = 'DOCOTRAL_DEGREE',
  MASTER_DEGREE = 'MASTER_DEGREE'
}

export interface IEducation {
  id?: number;
  type?: EducationDegree;
  reseumes?: IReseume[];
  counselorId?: number;
  visitorId?: number;
}

export class Education implements IEducation {
  constructor(
    public id?: number,
    public type?: EducationDegree,
    public reseumes?: IReseume[],
    public counselorId?: number,
    public visitorId?: number
  ) {}
}
