import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface ILibrary {
  id?: number;
  name?: string;
  creationTime?: Moment;
  visitorId?: number;
  categories?: ICategory[];
}

export class Library implements ILibrary {
  constructor(
    public id?: number,
    public name?: string,
    public creationTime?: Moment,
    public visitorId?: number,
    public categories?: ICategory[]
  ) {}
}
