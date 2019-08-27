import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_FORMAT} from 'app/shared/constants/input.constants';
import {map} from 'rxjs/operators';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared';
import {IReminder} from 'app/shared/model/reminder.model';

type EntityResponseType = HttpResponse<IReminder>;
type EntityArrayResponseType = HttpResponse<IReminder[]>;

@Injectable({ providedIn: 'root' })
export class ReminderService {
  public resourceUrl = SERVER_API_URL + 'api/reminders';

  constructor(protected http: HttpClient) {}

  create(reminder: IReminder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reminder);
    return this.http
      .post<IReminder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reminder: IReminder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reminder);
    return this.http
      .put<IReminder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReminder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReminder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reminder: IReminder): IReminder {
    const copy: IReminder = Object.assign({}, reminder, {
      date: reminder.date != null && reminder.date.isValid() ? reminder.date.format(DATE_FORMAT) : null,
      time: reminder.time != null && reminder.time.isValid() ? reminder.time.toJSON() : null
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
      res.body.forEach((reminder: IReminder) => {
        reminder.date = reminder.date != null ? moment(reminder.date) : null;
        reminder.time = reminder.time != null ? moment(reminder.time) : null;
      });
    }
    return res;
  }
}
