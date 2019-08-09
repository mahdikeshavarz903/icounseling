import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ITimeReserved, TimeReserved} from 'app/shared/model/time-reserved.model';
import {TimeReservedService} from './time-reserved.service';
import {TimeReservedComponent} from './time-reserved.component';
import {TimeReservedDetailComponent} from './time-reserved-detail.component';
import {TimeReservedUpdateComponent} from './time-reserved-update.component';
import {TimeReservedDeletePopupComponent} from './time-reserved-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TimeReservedResolve implements Resolve<ITimeReserved> {
  constructor(private service: TimeReservedService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITimeReserved> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TimeReserved>) => response.ok),
        map((timeReserved: HttpResponse<TimeReserved>) => timeReserved.body)
      );
    }
    return of(new TimeReserved());
  }
}

export const timeReservedRoute: Routes = [
  {
    path: '',
    component: TimeReservedComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.timeReserved.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TimeReservedDetailComponent,
    resolve: {
      timeReserved: TimeReservedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.timeReserved.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TimeReservedUpdateComponent,
    resolve: {
      timeReserved: TimeReservedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.timeReserved.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TimeReservedUpdateComponent,
    resolve: {
      timeReserved: TimeReservedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.timeReserved.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const timeReservedPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TimeReservedDeletePopupComponent,
    resolve: {
      timeReserved: TimeReservedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.timeReserved.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
