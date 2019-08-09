import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  CounselorComponent,
  CounselorDeleteDialogComponent,
  CounselorDeletePopupComponent,
  CounselorDetailComponent,
  counselorPopupRoute,
  counselorRoute,
  CounselorUpdateComponent
} from './';

const ENTITY_STATES = [...counselorRoute, ...counselorPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CounselorComponent,
    CounselorDetailComponent,
    CounselorUpdateComponent,
    CounselorDeleteDialogComponent,
    CounselorDeletePopupComponent
  ],
  entryComponents: [CounselorComponent, CounselorUpdateComponent, CounselorDeleteDialogComponent, CounselorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingCounselorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
