import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  EducationComponent,
  EducationDeleteDialogComponent,
  EducationDeletePopupComponent,
  EducationDetailComponent,
  educationPopupRoute,
  educationRoute,
  EducationUpdateComponent
} from './';

const ENTITY_STATES = [...educationRoute, ...educationPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EducationComponent,
    EducationDetailComponent,
    EducationUpdateComponent,
    EducationDeleteDialogComponent,
    EducationDeletePopupComponent
  ],
  entryComponents: [EducationComponent, EducationUpdateComponent, EducationDeleteDialogComponent, EducationDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingEducationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
