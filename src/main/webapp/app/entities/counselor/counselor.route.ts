import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Counselor } from 'app/shared/model/counselor.model';
import { CounselorService } from './counselor.service';
import { CounselorComponent } from './counselor.component';
import { CounselorDetailComponent } from './counselor-detail.component';
import { CounselorUpdateComponent } from './counselor-update.component';
import { CounselorDeletePopupComponent } from './counselor-delete-dialog.component';
import { ICounselor } from 'app/shared/model/counselor.model';

@Injectable({ providedIn: 'root' })
export class CounselorResolve implements Resolve<ICounselor> {
  constructor(private service: CounselorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICounselor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Counselor>) => response.ok),
        map((counselor: HttpResponse<Counselor>) => counselor.body)
      );
    }
    return of(new Counselor());
  }
}

export const counselorRoute: Routes = [
  {
    path: '',
    component: CounselorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.counselor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CounselorDetailComponent,
    resolve: {
      counselor: CounselorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CounselorUpdateComponent,
    resolve: {
      counselor: CounselorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CounselorUpdateComponent,
    resolve: {
      counselor: CounselorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const counselorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CounselorDeletePopupComponent,
    resolve: {
      counselor: CounselorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.counselor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
