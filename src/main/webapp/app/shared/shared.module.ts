import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ICounselingSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ICounselingSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ICounselingSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingSharedModule {
  static forRoot() {
    return {
      ngModule: ICounselingSharedModule
    };
  }
}
