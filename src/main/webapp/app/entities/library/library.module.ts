import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  LibraryComponent,
  LibraryDeleteDialogComponent,
  LibraryDeletePopupComponent,
  LibraryDetailComponent,
  libraryPopupRoute,
  libraryRoute,
  LibraryUpdateComponent
} from './';

const ENTITY_STATES = [...libraryRoute, ...libraryPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LibraryComponent,
    LibraryDetailComponent,
    LibraryUpdateComponent,
    LibraryDeleteDialogComponent,
    LibraryDeletePopupComponent
  ],
  entryComponents: [LibraryComponent, LibraryUpdateComponent, LibraryDeleteDialogComponent, LibraryDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingLibraryModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
