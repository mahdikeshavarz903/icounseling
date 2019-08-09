import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  PlanningComponent,
  PlanningDeleteDialogComponent,
  PlanningDeletePopupComponent,
  PlanningDetailComponent,
  planningPopupRoute,
  planningRoute,
  PlanningUpdateComponent
} from './';

const ENTITY_STATES = [...planningRoute, ...planningPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlanningComponent,
    PlanningDetailComponent,
    PlanningUpdateComponent,
    PlanningDeleteDialogComponent,
    PlanningDeletePopupComponent
  ],
  entryComponents: [PlanningComponent, PlanningUpdateComponent, PlanningDeleteDialogComponent, PlanningDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingPlanningModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
