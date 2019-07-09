/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { CounselorUpdateComponent } from 'app/entities/counselor/counselor-update.component';
import { CounselorService } from 'app/entities/counselor/counselor.service';
import { Counselor } from 'app/shared/model/counselor.model';

describe('Component Tests', () => {
  describe('Counselor Management Update Component', () => {
    let comp: CounselorUpdateComponent;
    let fixture: ComponentFixture<CounselorUpdateComponent>;
    let service: CounselorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CounselorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CounselorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CounselorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Counselor(123);
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
        const entity = new Counselor();
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
