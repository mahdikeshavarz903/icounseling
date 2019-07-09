/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { CounselingCaseDetailComponent } from 'app/entities/counseling-case/counseling-case-detail.component';
import { CounselingCase } from 'app/shared/model/counseling-case.model';

describe('Component Tests', () => {
  describe('CounselingCase Management Detail Component', () => {
    let comp: CounselingCaseDetailComponent;
    let fixture: ComponentFixture<CounselingCaseDetailComponent>;
    const route = ({ data: of({ counselingCase: new CounselingCase(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselingCaseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CounselingCaseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CounselingCaseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.counselingCase).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
