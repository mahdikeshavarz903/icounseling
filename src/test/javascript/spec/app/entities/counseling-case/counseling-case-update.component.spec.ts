/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { CounselingCaseUpdateComponent } from 'app/entities/counseling-case/counseling-case-update.component';
import { CounselingCaseService } from 'app/entities/counseling-case/counseling-case.service';
import { CounselingCase } from 'app/shared/model/counseling-case.model';

describe('Component Tests', () => {
  describe('CounselingCase Management Update Component', () => {
    let comp: CounselingCaseUpdateComponent;
    let fixture: ComponentFixture<CounselingCaseUpdateComponent>;
    let service: CounselingCaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselingCaseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CounselingCaseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CounselingCaseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CounselingCaseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CounselingCase(123);
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
        const entity = new CounselingCase();
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
