import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ICounselingSharedModule } from 'app/shared';
import {
  ScoreComponent,
  ScoreDetailComponent,
  ScoreUpdateComponent,
  ScoreDeletePopupComponent,
  ScoreDeleteDialogComponent,
  scoreRoute,
  scorePopupRoute
} from './';

const ENTITY_STATES = [...scoreRoute, ...scorePopupRoute];

@NgModule({
  imports: [ICounselingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ScoreComponent, ScoreDetailComponent, ScoreUpdateComponent, ScoreDeleteDialogComponent, ScoreDeletePopupComponent],
  entryComponents: [ScoreComponent, ScoreUpdateComponent, ScoreDeleteDialogComponent, ScoreDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingScoreModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
