import {Moment} from 'moment';

export const enum PaymentType {
  FREE = 'FREE',
  PAID = 'PAID'
}

export const enum DocumentFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
  DOC = 'DOC',
  XLSX = 'XLSX',
  PPT = 'PPT'
}

export interface IDocument {
  id?: number;
  title?: string;
  descriptionContentType?: string;
  description?: any;
  price?: number;
  publishedDate?: Moment;
  paymentType?: PaymentType;
  documentFormat?: DocumentFormat;
  imagesGalleryContentType?: string;
  imagesGallery?: any;
  tag?: string;
  rateIndex?: string;
  rateId?: number;
  commentId?: number;
  gategoryCategoryType?: string;
  gategoryId?: number;
  counselorId?: number;
}

export const defaultValue: Readonly<IDocument> = {};
