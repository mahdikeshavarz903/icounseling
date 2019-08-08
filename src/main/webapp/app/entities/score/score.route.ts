import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Score } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { ScoreComponent } from './score.component';
import { ScoreDetailComponent } from './score-detail.component';
import { ScoreUpdateComponent } from './score-update.component';
import { ScoreDeletePopupComponent } from './score-delete-dialog.component';
import { IScore } from 'app/shared/model/score.model';

@Injectable({ providedIn: 'root' })
export class ScoreResolve implements Resolve<IScore> {
  constructor(private service: ScoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IScore> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Score>) => response.ok),
        map((score: HttpResponse<Score>) => score.body)
      );
    }
    return of(new Score());
  }
}

export const scoreRoute: Routes = [
  {
    path: '',
    component: ScoreComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.score.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ScoreDetailComponent,
    resolve: {
      score: ScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.score.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.score.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.score.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scorePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ScoreDeletePopupComponent,
    resolve: {
      score: ScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.score.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
