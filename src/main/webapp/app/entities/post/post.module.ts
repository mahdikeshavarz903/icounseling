import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  PostComponent,
  PostDeleteDialogComponent,
  PostDeletePopupComponent,
  PostDetailComponent,
  postPopupRoute,
  postRoute,
  PostUpdateComponent
} from './';

const ENTITY_STATES = [...postRoute, ...postPopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PostComponent, PostDetailComponent, PostUpdateComponent, PostDeleteDialogComponent, PostDeletePopupComponent],
  entryComponents: [PostComponent, PostUpdateComponent, PostDeleteDialogComponent, PostDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingPostModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
