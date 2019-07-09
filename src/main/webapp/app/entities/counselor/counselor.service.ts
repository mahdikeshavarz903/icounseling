import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICounselor } from 'app/shared/model/counselor.model';

type EntityResponseType = HttpResponse<ICounselor>;
type EntityArrayResponseType = HttpResponse<ICounselor[]>;

@Injectable({ providedIn: 'root' })
export class CounselorService {
  public resourceUrl = SERVER_API_URL + 'api/counselors';

  constructor(protected http: HttpClient) {}

  create(counselor: ICounselor): Observable<EntityResponseType> {
    return this.http.post<ICounselor>(this.resourceUrl, counselor, { observe: 'response' });
  }

  update(counselor: ICounselor): Observable<EntityResponseType> {
    return this.http.put<ICounselor>(this.resourceUrl, counselor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounselor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounselor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
