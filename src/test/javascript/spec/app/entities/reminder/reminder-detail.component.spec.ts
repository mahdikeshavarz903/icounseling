/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICounselingTestModule } from '../../../test.module';
import { ReminderDetailComponent } from 'app/entities/reminder/reminder-detail.component';
import { Reminder } from 'app/shared/model/reminder.model';

describe('Component Tests', () => {
  describe('Reminder Management Detail Component', () => {
    let comp: ReminderDetailComponent;
    let fixture: ComponentFixture<ReminderDetailComponent>;
    const route = ({ data: of({ reminder: new Reminder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ICounselingTestModule],
        declarations: [ReminderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReminderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReminderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reminder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
