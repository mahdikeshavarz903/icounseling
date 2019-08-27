import {Moment} from 'moment';
import {ICategory} from 'app/shared/model/category.model';

export interface ILibrary {
  id?: number;
  name?: string;
  creationTime?: Moment;
  visitorId?: number;
  categories?: ICategory[];
}

export const defaultValue: Readonly<ILibrary> = {};
