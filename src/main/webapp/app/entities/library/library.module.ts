import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ICounselingSharedModule } from 'app/shared';
import {
  LibraryComponent,
  LibraryDetailComponent,
  LibraryUpdateComponent,
  LibraryDeletePopupComponent,
  LibraryDeleteDialogComponent,
  libraryRoute,
  libraryPopupRoute
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
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
