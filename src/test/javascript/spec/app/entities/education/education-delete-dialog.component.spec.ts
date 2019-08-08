/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselingTestModule } from '../../../test.module';
import { EducationDeleteDialogComponent } from 'app/entities/education/education-delete-dialog.component';
import { EducationService } from 'app/entities/education/education.service';

describe('Component Tests', () => {
  describe('Education Management Delete Component', () => {
    let comp: EducationDeleteDialogComponent;
    let fixture: ComponentFixture<EducationDeleteDialogComponent>;
    let service: EducationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [EducationDeleteDialogComponent]
      })
        .overrideTemplate(EducationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EducationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EducationService);
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
