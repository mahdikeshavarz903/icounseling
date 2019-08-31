export interface IComment {
  id?: number;
  scheduleId?: number;
  rateId?: number;
  documentId?: number;
  postId?: number;
}

export const defaultValue: Readonly<IComment> = {};
