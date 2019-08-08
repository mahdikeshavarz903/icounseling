import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICounselingCase } from 'app/shared/model/counseling-case.model';

type EntityResponseType = HttpResponse<ICounselingCase>;
type EntityArrayResponseType = HttpResponse<ICounselingCase[]>;

@Injectable({ providedIn: 'root' })
export class CounselingCaseService {
  public resourceUrl = SERVER_API_URL + 'api/counseling-cases';

  constructor(protected http: HttpClient) {}

  create(counselingCase: ICounselingCase): Observable<EntityResponseType> {
    return this.http.post<ICounselingCase>(this.resourceUrl, counselingCase, { observe: 'response' });
  }

  update(counselingCase: ICounselingCase): Observable<EntityResponseType> {
    return this.http.put<ICounselingCase>(this.resourceUrl, counselingCase, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounselingCase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounselingCase[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
