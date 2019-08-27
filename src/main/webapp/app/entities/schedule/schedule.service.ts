import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_FORMAT} from 'app/shared/constants/input.constants';
import {map} from 'rxjs/operators';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared';
import {ISchedule} from 'app/shared/model/schedule.model';

type EntityResponseType = HttpResponse<ISchedule>;
type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  public resourceUrl = SERVER_API_URL + 'api/schedules';

  constructor(protected http: HttpClient) {}

  create(schedule: ISchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(schedule);
    return this.http
      .post<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(schedule: ISchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(schedule);
    return this.http
      .put<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(schedule: ISchedule): ISchedule {
    const copy: ISchedule = Object.assign({}, schedule, {
      date: schedule.date != null && schedule.date.isValid() ? schedule.date.format(DATE_FORMAT) : null,
      time: schedule.time != null && schedule.time.isValid() ? schedule.time.toJSON() : null
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
      res.body.forEach((schedule: ISchedule) => {
        schedule.date = schedule.date != null ? moment(schedule.date) : null;
        schedule.time = schedule.time != null ? moment(schedule.time) : null;
      });
    }
    return res;
  }
}
