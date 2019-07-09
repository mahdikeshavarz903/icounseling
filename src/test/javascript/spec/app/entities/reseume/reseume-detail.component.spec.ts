/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { ReseumeDetailComponent } from 'app/entities/reseume/reseume-detail.component';
import { Reseume } from 'app/shared/model/reseume.model';

describe('Component Tests', () => {
  describe('Reseume Management Detail Component', () => {
    let comp: ReseumeDetailComponent;
    let fixture: ComponentFixture<ReseumeDetailComponent>;
    const route = ({ data: of({ reseume: new Reseume(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [ReseumeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReseumeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReseumeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reseume).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
