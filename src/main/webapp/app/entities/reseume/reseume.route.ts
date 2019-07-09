import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reseume } from 'app/shared/model/reseume.model';
import { ReseumeService } from './reseume.service';
import { ReseumeComponent } from './reseume.component';
import { ReseumeDetailComponent } from './reseume-detail.component';
import { ReseumeUpdateComponent } from './reseume-update.component';
import { ReseumeDeletePopupComponent } from './reseume-delete-dialog.component';
import { IReseume } from 'app/shared/model/reseume.model';

@Injectable({ providedIn: 'root' })
export class ReseumeResolve implements Resolve<IReseume> {
  constructor(private service: ReseumeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReseume> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reseume>) => response.ok),
        map((reseume: HttpResponse<Reseume>) => reseume.body)
      );
    }
    return of(new Reseume());
  }
}

export const reseumeRoute: Routes = [
  {
    path: '',
    component: ReseumeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.reseume.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReseumeDetailComponent,
    resolve: {
      reseume: ReseumeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reseume.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReseumeUpdateComponent,
    resolve: {
      reseume: ReseumeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reseume.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReseumeUpdateComponent,
    resolve: {
      reseume: ReseumeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reseume.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reseumePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReseumeDeletePopupComponent,
    resolve: {
      reseume: ReseumeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reseume.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
