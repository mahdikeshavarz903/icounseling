import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ICounselingSharedModule } from 'app/shared';
import {
  ReminderComponent,
  ReminderDetailComponent,
  ReminderUpdateComponent,
  ReminderDeletePopupComponent,
  ReminderDeleteDialogComponent,
  reminderRoute,
  reminderPopupRoute
} from './';

const ENTITY_STATES = [...reminderRoute, ...reminderPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReminderComponent,
    ReminderDetailComponent,
    ReminderUpdateComponent,
    ReminderDeleteDialogComponent,
    ReminderDeletePopupComponent
  ],
  entryComponents: [ReminderComponent, ReminderUpdateComponent, ReminderDeleteDialogComponent, ReminderDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingReminderModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
