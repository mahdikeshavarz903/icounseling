import { IDocument } from 'app/shared/model/document.model';

export const enum CategoryType {
  ROMANCE = 'ROMANCE',
  ARTS_PHOTOGRAPHY = 'ARTS_PHOTOGRAPHY',
  BIOGRAPHIES_MEMOIRS = 'BIOGRAPHIES_MEMOIRS',
  BUSINESS_INVESTING = 'BUSINESS_INVESTING',
  CHILDREN_BOOKS = 'CHILDREN_BOOKS',
  COOKBOOKS_FOOD = 'COOKBOOKS_FOOD',
  HISTORY = 'HISTORY',
  LOTERATURE_FICTION = 'LOTERATURE_FICTION',
  MYSTERY_THRILLER_SUSPENSE = 'MYSTERY_THRILLER_SUSPENSE',
  SCIENCE_FICTION_FANTASY = 'SCIENCE_FICTION_FANTASY',
  TEEN_YOUNG_ADULT_BOOKS = 'TEEN_YOUNG_ADULT_BOOKS'
}

export interface ICategory {
  id?: number;
  imagesContentType?: string;
  images?: any;
  categoryType?: CategoryType;
  documents?: IDocument[];
  libraryId?: number;
}

export const defaultValue: Readonly<ICategory> = {};
