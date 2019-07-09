import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ICounselingSharedModule } from 'app/shared';
import {
  CounselingCaseComponent,
  CounselingCaseDetailComponent,
  CounselingCaseUpdateComponent,
  CounselingCaseDeletePopupComponent,
  CounselingCaseDeleteDialogComponent,
  counselingCaseRoute,
  counselingCasePopupRoute
} from './';

const ENTITY_STATES = [...counselingCaseRoute, ...counselingCasePopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CounselingCaseComponent,
    CounselingCaseDetailComponent,
    CounselingCaseUpdateComponent,
    CounselingCaseDeleteDialogComponent,
    CounselingCaseDeletePopupComponent
  ],
  entryComponents: [
    CounselingCaseComponent,
    CounselingCaseUpdateComponent,
    CounselingCaseDeleteDialogComponent,
    CounselingCaseDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingCounselingCaseModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
