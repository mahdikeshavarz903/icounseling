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

export class Score implements IScore {
  constructor(
    public id?: number,
    public total?: number,
    public imageContentType?: string,
    public image?: any,
    public degree?: ScoreDegree,
    public counselorId?: number,
    public visitorId?: number
  ) {}
}
