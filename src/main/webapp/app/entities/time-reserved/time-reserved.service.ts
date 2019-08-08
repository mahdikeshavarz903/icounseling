import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeReserved } from 'app/shared/model/time-reserved.model';

type EntityResponseType = HttpResponse<ITimeReserved>;
type EntityArrayResponseType = HttpResponse<ITimeReserved[]>;

@Injectable({ providedIn: 'root' })
export class TimeReservedService {
  public resourceUrl = SERVER_API_URL + 'api/time-reserveds';

  constructor(protected http: HttpClient) {}

  create(timeReserved: ITimeReserved): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeReserved);
    return this.http
      .post<ITimeReserved>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(timeReserved: ITimeReserved): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeReserved);
    return this.http
      .put<ITimeReserved>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeReserved>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITimeReserved[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(timeReserved: ITimeReserved): ITimeReserved {
    const copy: ITimeReserved = Object.assign({}, timeReserved, {
      date: timeReserved.date != null && timeReserved.date.isValid() ? timeReserved.date.format(DATE_FORMAT) : null,
      time: timeReserved.time != null && timeReserved.time.isValid() ? timeReserved.time.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
      res.body.time = res.body.time != null ? moment(res.body.time) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timeReserved: ITimeReserved) => {
        timeReserved.date = timeReserved.date != null ? moment(timeReserved.date) : null;
        timeReserved.time = timeReserved.time != null ? moment(timeReserved.time) : null;
      });
    }
    return res;
  }
}
