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

export const defaultValue: Readonly<ICounselingCase> = {};
