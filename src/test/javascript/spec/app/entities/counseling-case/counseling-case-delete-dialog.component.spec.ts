/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselingTestModule } from '../../../test.module';
import { CounselingCaseDeleteDialogComponent } from 'app/entities/counseling-case/counseling-case-delete-dialog.component';
import { CounselingCaseService } from 'app/entities/counseling-case/counseling-case.service';

describe('Component Tests', () => {
  describe('CounselingCase Management Delete Component', () => {
    let comp: CounselingCaseDeleteDialogComponent;
    let fixture: ComponentFixture<CounselingCaseDeleteDialogComponent>;
    let service: CounselingCaseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselingCaseDeleteDialogComponent]
      })
        .overrideTemplate(CounselingCaseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CounselingCaseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CounselingCaseService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
