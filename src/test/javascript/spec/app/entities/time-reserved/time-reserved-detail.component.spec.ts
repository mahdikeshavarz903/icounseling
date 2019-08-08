/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { TimeReservedDetailComponent } from 'app/entities/time-reserved/time-reserved-detail.component';
import { TimeReserved } from 'app/shared/model/time-reserved.model';

describe('Component Tests', () => {
  describe('TimeReserved Management Detail Component', () => {
    let comp: TimeReservedDetailComponent;
    let fixture: ComponentFixture<TimeReservedDetailComponent>;
    const route = ({ data: of({ timeReserved: new TimeReserved(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [TimeReservedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TimeReservedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TimeReservedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.timeReserved).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
