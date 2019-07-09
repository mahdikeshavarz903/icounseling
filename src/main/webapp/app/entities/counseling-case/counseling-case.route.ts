import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CounselingCase } from 'app/shared/model/counseling-case.model';
import { CounselingCaseService } from './counseling-case.service';
import { CounselingCaseComponent } from './counseling-case.component';
import { CounselingCaseDetailComponent } from './counseling-case-detail.component';
import { CounselingCaseUpdateComponent } from './counseling-case-update.component';
import { CounselingCaseDeletePopupComponent } from './counseling-case-delete-dialog.component';
import { ICounselingCase } from 'app/shared/model/counseling-case.model';

@Injectable({ providedIn: 'root' })
export class CounselingCaseResolve implements Resolve<ICounselingCase> {
  constructor(private service: CounselingCaseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICounselingCase> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CounselingCase>) => response.ok),
        map((counselingCase: HttpResponse<CounselingCase>) => counselingCase.body)
      );
    }
    return of(new CounselingCase());
  }
}

export const counselingCaseRoute: Routes = [
  {
    path: '',
    component: CounselingCaseComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.counselingCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CounselingCaseDetailComponent,
    resolve: {
      counselingCase: CounselingCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselingCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CounselingCaseUpdateComponent,
    resolve: {
      counselingCase: CounselingCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselingCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CounselingCaseUpdateComponent,
    resolve: {
      counselingCase: CounselingCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselingCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const counselingCasePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CounselingCaseDeletePopupComponent,
    resolve: {
      counselingCase: CounselingCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselingCase.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
