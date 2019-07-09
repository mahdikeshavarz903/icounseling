export const enum CounselingCaseStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED'
}

export interface ICounselingCase {
  id?: number;
  status?: CounselingCaseStatus;
  visitorId?: number;
  counselorId?: number;
}

export class CounselingCase implements ICounselingCase {
  constructor(public id?: number, public status?: CounselingCaseStatus, public visitorId?: number, public counselorId?: number) {}
}
