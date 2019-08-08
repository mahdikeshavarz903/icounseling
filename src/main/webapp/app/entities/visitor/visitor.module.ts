import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ICounselingSharedModule } from 'app/shared';
import {
  VisitorComponent,
  VisitorDetailComponent,
  VisitorUpdateComponent,
  VisitorDeletePopupComponent,
  VisitorDeleteDialogComponent,
  visitorRoute,
  visitorPopupRoute
} from './';

const ENTITY_STATES = [...visitorRoute, ...visitorPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VisitorComponent,
    VisitorDetailComponent,
    VisitorUpdateComponent,
    VisitorDeleteDialogComponent,
    VisitorDeletePopupComponent
  ],
  entryComponents: [VisitorComponent, VisitorUpdateComponent, VisitorDeleteDialogComponent, VisitorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingVisitorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
