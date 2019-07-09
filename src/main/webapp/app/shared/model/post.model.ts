import { IComment } from 'app/shared/model/comment.model';

export const enum DocumentFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
  DOC = 'DOC',
  XLSX = 'XLSX',
  PPT = 'PPT'
}

export interface IPost {
  id?: number;
  imageContentType?: string;
  image?: any;
  documentFormat?: DocumentFormat;
  scheduleId?: number;
  comments?: IComment[];
  counselorId?: number;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public imageContentType?: string,
    public image?: any,
    public documentFormat?: DocumentFormat,
    public scheduleId?: number,
    public comments?: IComment[],
    public counselorId?: number
  ) {}
}
