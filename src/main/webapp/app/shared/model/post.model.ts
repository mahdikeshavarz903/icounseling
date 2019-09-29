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
  likeNumbers?: number;
  numberOfViews?: number;
  documentFormat?: DocumentFormat;
  scheduleId?: number;
  comments?: IComment[];
  counselorId?: number;
}

export const defaultValue: Readonly<IPost> = {};
