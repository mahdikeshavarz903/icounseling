import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  DocumentComponent,
  DocumentDeleteDialogComponent,
  DocumentDeletePopupComponent,
  DocumentDetailComponent,
  documentPopupRoute,
  documentRoute,
  DocumentUpdateComponent
} from './';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocumentComponent,
    DocumentDetailComponent,
    DocumentUpdateComponent,
    DocumentDeleteDialogComponent,
    DocumentDeletePopupComponent
  ],
  entryComponents: [DocumentComponent, DocumentUpdateComponent, DocumentDeleteDialogComponent, DocumentDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingDocumentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
