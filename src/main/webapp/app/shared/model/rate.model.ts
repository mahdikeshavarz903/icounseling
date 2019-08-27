export interface IRate {
  id?: number;
  index?: number;
  title?: string;
  documentId?: number;
  commentId?: number;
}

export const defaultValue: Readonly<IRate> = {};
