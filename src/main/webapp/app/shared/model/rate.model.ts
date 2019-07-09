export interface IRate {
  id?: number;
  index?: number;
  title?: string;
  documentId?: number;
  commentId?: number;
}

export class Rate implements IRate {
  constructor(public id?: number, public index?: number, public title?: string, public documentId?: number, public commentId?: number) {}
}
