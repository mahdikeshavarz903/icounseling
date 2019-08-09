import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  TimeReservedComponent,
  TimeReservedDeleteDialogComponent,
  TimeReservedDeletePopupComponent,
  TimeReservedDetailComponent,
  timeReservedPopupRoute,
  timeReservedRoute,
  TimeReservedUpdateComponent
} from './';

const ENTITY_STATES = [...timeReservedRoute, ...timeReservedPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TimeReservedComponent,
    TimeReservedDetailComponent,
    TimeReservedUpdateComponent,
    TimeReservedDeleteDialogComponent,
    TimeReservedDeletePopupComponent
  ],
  entryComponents: [
    TimeReservedComponent,
    TimeReservedUpdateComponent,
    TimeReservedDeleteDialogComponent,
    TimeReservedDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingTimeReservedModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
