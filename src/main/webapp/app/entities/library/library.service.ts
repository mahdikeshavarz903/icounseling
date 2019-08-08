import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILibrary } from 'app/shared/model/library.model';

type EntityResponseType = HttpResponse<ILibrary>;
type EntityArrayResponseType = HttpResponse<ILibrary[]>;

@Injectable({ providedIn: 'root' })
export class LibraryService {
  public resourceUrl = SERVER_API_URL + 'api/libraries';

  constructor(protected http: HttpClient) {}

  create(library: ILibrary): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(library);
    return this.http
      .post<ILibrary>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(library: ILibrary): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(library);
    return this.http
      .put<ILibrary>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILibrary>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILibrary[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(library: ILibrary): ILibrary {
    const copy: ILibrary = Object.assign({}, library, {
      creationTime: library.creationTime != null && library.creationTime.isValid() ? library.creationTime.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationTime = res.body.creationTime != null ? moment(res.body.creationTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((library: ILibrary) => {
        library.creationTime = library.creationTime != null ? moment(library.creationTime) : null;
      });
    }
    return res;
  }
}
