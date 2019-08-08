/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { ReseumeUpdateComponent } from 'app/entities/reseume/reseume-update.component';
import { ReseumeService } from 'app/entities/reseume/reseume.service';
import { Reseume } from 'app/shared/model/reseume.model';

describe('Component Tests', () => {
  describe('Reseume Management Update Component', () => {
    let comp: ReseumeUpdateComponent;
    let fixture: ComponentFixture<ReseumeUpdateComponent>;
    let service: ReseumeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [ReseumeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReseumeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReseumeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReseumeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reseume(123);
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
        const entity = new Reseume();
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
