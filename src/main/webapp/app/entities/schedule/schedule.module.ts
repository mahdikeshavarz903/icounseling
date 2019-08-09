import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  ScheduleComponent,
  ScheduleDeleteDialogComponent,
  ScheduleDeletePopupComponent,
  ScheduleDetailComponent,
  schedulePopupRoute,
  scheduleRoute,
  ScheduleUpdateComponent
} from './';

const ENTITY_STATES = [...scheduleRoute, ...schedulePopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleUpdateComponent,
    ScheduleDeleteDialogComponent,
    ScheduleDeletePopupComponent
  ],
  entryComponents: [ScheduleComponent, ScheduleUpdateComponent, ScheduleDeleteDialogComponent, ScheduleDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingScheduleModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
