import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {IReminder, Reminder} from 'app/shared/model/reminder.model';
import {ReminderService} from './reminder.service';
import {ReminderComponent} from './reminder.component';
import {ReminderDetailComponent} from './reminder-detail.component';
import {ReminderUpdateComponent} from './reminder-update.component';
import {ReminderDeletePopupComponent} from './reminder-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ReminderResolve implements Resolve<IReminder> {
  constructor(private service: ReminderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReminder> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reminder>) => response.ok),
        map((reminder: HttpResponse<Reminder>) => reminder.body)
      );
    }
    return of(new Reminder());
  }
}

export const reminderRoute: Routes = [
  {
    path: '',
    component: ReminderComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'iCounselingApp.reminder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReminderDetailComponent,
    resolve: {
      reminder: ReminderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reminder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReminderUpdateComponent,
    resolve: {
      reminder: ReminderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reminder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReminderUpdateComponent,
    resolve: {
      reminder: ReminderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reminder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reminderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReminderDeletePopupComponent,
    resolve: {
      reminder: ReminderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'iCounselingApp.reminder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
