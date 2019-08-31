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

export const defaultValue: Readonly<IEducation> = {};
