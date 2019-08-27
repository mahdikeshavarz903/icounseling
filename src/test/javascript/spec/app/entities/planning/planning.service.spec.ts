/* tslint:disable max-line-length */
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {map, take} from 'rxjs/operators';
import * as moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {PlanningService} from 'app/entities/planning/planning.service';
import {IPlanning, Planning} from 'app/shared/model/planning.model';

describe('Service Tests', () => {
  describe('Planning Service', () => {
    let injector: TestBed;
    let service: PlanningService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanning;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlanningService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Planning(0, 'AAAAAAA', currentDate, currentDate, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Planning', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDate: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            startTime: currentDate,
            endDate: currentDate,
            endTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Planning(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Planning', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            startTime: currentDate,
            endDate: currentDate,
            endTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Planning', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            description: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            startTime: currentDate,
            endDate: currentDate,
            endTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Planning', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
