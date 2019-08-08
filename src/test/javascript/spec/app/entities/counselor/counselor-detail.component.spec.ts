/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { CounselorDetailComponent } from 'app/entities/counselor/counselor-detail.component';
import { Counselor } from 'app/shared/model/counselor.model';

describe('Component Tests', () => {
  describe('Counselor Management Detail Component', () => {
    let comp: CounselorDetailComponent;
    let fixture: ComponentFixture<CounselorDetailComponent>;
    const route = ({ data: of({ counselor: new Counselor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [CounselorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CounselorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CounselorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.counselor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
