export interface IComment {
  id?: number;
  scheduleId?: number;
  rateId?: number;
  documentId?: number;
  postId?: number;
}

export class Comment implements IComment {
  constructor(public id?: number, public scheduleId?: number, public rateId?: number, public documentId?: number, public postId?: number) {}
}
