/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselingTestModule } from '../../../test.module';
import { TimeReservedDeleteDialogComponent } from 'app/entities/time-reserved/time-reserved-delete-dialog.component';
import { TimeReservedService } from 'app/entities/time-reserved/time-reserved.service';

describe('Component Tests', () => {
  describe('TimeReserved Management Delete Component', () => {
    let comp: TimeReservedDeleteDialogComponent;
    let fixture: ComponentFixture<TimeReservedDeleteDialogComponent>;
    let service: TimeReservedService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [TimeReservedDeleteDialogComponent]
      })
        .overrideTemplate(TimeReservedDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TimeReservedDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimeReservedService);
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
