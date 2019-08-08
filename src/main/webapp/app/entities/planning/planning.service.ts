import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlanning } from 'app/shared/model/planning.model';

type EntityResponseType = HttpResponse<IPlanning>;
type EntityArrayResponseType = HttpResponse<IPlanning[]>;

@Injectable({ providedIn: 'root' })
export class PlanningService {
  public resourceUrl = SERVER_API_URL + 'api/plannings';

  constructor(protected http: HttpClient) {}

  create(planning: IPlanning): Observable<EntityResponseType> {
    return this.http.post<IPlanning>(this.resourceUrl, planning, { observe: 'response' });
  }

  update(planning: IPlanning): Observable<EntityResponseType> {
    return this.http.put<IPlanning>(this.resourceUrl, planning, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlanning>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlanning[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
