/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { TimeReservedUpdateComponent } from 'app/entities/time-reserved/time-reserved-update.component';
import { TimeReservedService } from 'app/entities/time-reserved/time-reserved.service';
import { TimeReserved } from 'app/shared/model/time-reserved.model';

describe('Component Tests', () => {
  describe('TimeReserved Management Update Component', () => {
    let comp: TimeReservedUpdateComponent;
    let fixture: ComponentFixture<TimeReservedUpdateComponent>;
    let service: TimeReservedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [TimeReservedUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TimeReservedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TimeReservedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimeReservedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TimeReserved(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TimeReserved();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
