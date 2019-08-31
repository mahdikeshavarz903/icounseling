export const enum ScoreDegree {
  PROFESSIONAL = 'PROFESSIONAL',
  GENERAL = 'GENERAL'
}

export interface IScore {
  id?: number;
  total?: number;
  imageContentType?: string;
  image?: any;
  degree?: ScoreDegree;
  counselorId?: number;
  visitorId?: number;
}

export const defaultValue: Readonly<IScore> = {};
