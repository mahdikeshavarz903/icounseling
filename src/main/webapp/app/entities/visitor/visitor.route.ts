import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Visitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';
import { VisitorComponent } from './visitor.component';
import { VisitorDetailComponent } from './visitor-detail.component';
import { VisitorUpdateComponent } from './visitor-update.component';
import { VisitorDeletePopupComponent } from './visitor-delete-dialog.component';
import { IVisitor } from 'app/shared/model/visitor.model';

@Injectable({ providedIn: 'root' })
export class VisitorResolve implements Resolve<IVisitor> {
  constructor(private service: VisitorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVisitor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Visitor>) => response.ok),
        map((visitor: HttpResponse<Visitor>) => visitor.body)
      );
    }
    return of(new Visitor());
  }
}

export const visitorRoute: Routes = [
  {
    path: '',
    component: VisitorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.visitor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitorDetailComponent,
    resolve: {
      visitor: VisitorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.visitor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitorUpdateComponent,
    resolve: {
      visitor: VisitorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.visitor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitorUpdateComponent,
    resolve: {
      visitor: VisitorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.visitor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const visitorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VisitorDeletePopupComponent,
    resolve: {
      visitor: VisitorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.visitor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
