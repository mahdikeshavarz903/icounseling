import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  RateComponent,
  RateDeleteDialogComponent,
  RateDeletePopupComponent,
  RateDetailComponent,
  ratePopupRoute,
  rateRoute,
  RateUpdateComponent
} from './';

const ENTITY_STATES = [...rateRoute, ...ratePopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RateComponent, RateDetailComponent, RateUpdateComponent, RateDeleteDialogComponent, RateDeletePopupComponent],
  entryComponents: [RateComponent, RateUpdateComponent, RateDeleteDialogComponent, RateDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingRateModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
