import { Moment } from 'moment';

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

export class Document implements IDocument {
  constructor(
    public id?: number,
    public title?: string,
    public descriptionContentType?: string,
    public description?: any,
    public price?: number,
    public publishedDate?: Moment,
    public paymentType?: PaymentType,
    public documentFormat?: DocumentFormat,
    public imagesGalleryContentType?: string,
    public imagesGallery?: any,
    public tag?: string,
    public rateIndex?: string,
    public rateId?: number,
    public commentId?: number,
    public gategoryCategoryType?: string,
    public gategoryId?: number,
    public counselorId?: number
  ) {}
}
