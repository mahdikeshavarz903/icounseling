/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselingTestModule } from '../../../test.module';
import { CounselorDeleteDialogComponent } from 'app/entities/counselor/counselor-delete-dialog.component';
import { CounselorService } from 'app/entities/counselor/counselor.service';

describe('Component Tests', () => {
  describe('Counselor Management Delete Component', () => {
    let comp: CounselorDeleteDialogComponent;
    let fixture: ComponentFixture<CounselorDeleteDialogComponent>;
    let service: CounselorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselorDeleteDialogComponent]
      })
        .overrideTemplate(CounselorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CounselorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CounselorService);
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
