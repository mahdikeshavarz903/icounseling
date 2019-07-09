/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { VisitorDetailComponent } from 'app/entities/visitor/visitor-detail.component';
import { Visitor } from 'app/shared/model/visitor.model';

describe('Component Tests', () => {
  describe('Visitor Management Detail Component', () => {
    let comp: VisitorDetailComponent;
    let fixture: ComponentFixture<VisitorDetailComponent>;
    const route = ({ data: of({ visitor: new Visitor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [VisitorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
