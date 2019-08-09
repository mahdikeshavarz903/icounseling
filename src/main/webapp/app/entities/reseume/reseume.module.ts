import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {ICounselingSharedModule} from 'app/shared';
import {
  ReseumeComponent,
  ReseumeDeleteDialogComponent,
  ReseumeDeletePopupComponent,
  ReseumeDetailComponent,
  reseumePopupRoute,
  reseumeRoute,
  ReseumeUpdateComponent
} from './';

const ENTITY_STATES = [...reseumeRoute, ...reseumePopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReseumeComponent,
    ReseumeDetailComponent,
    ReseumeUpdateComponent,
    ReseumeDeleteDialogComponent,
    ReseumeDeletePopupComponent
  ],
  entryComponents: [ReseumeComponent, ReseumeUpdateComponent, ReseumeDeleteDialogComponent, ReseumeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingReseumeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
