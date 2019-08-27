import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {JhiAlertService} from 'ng-jhipster';
import {ITimeReserved, TimeReserved} from 'app/shared/model/time-reserved.model';
import {TimeReservedService} from './time-reserved.service';
import {ICounselor} from 'app/shared/model/counselor.model';
import {CounselorService} from 'app/entities/counselor';

@Component({
  selector: 'jhi-time-reserved-update',
  templateUrl: './time-reserved-update.component.html'
})
export class TimeReservedUpdateComponent implements OnInit {
  isSaving: boolean;

  counselors: ICounselor[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    time: [null, [Validators.required]],
    description: [null, [Validators.required]],
    counselorId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected timeReservedService: TimeReservedService,
    protected counselorService: CounselorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ timeReserved }) => {
      this.updateForm(timeReserved);
    });
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(timeReserved: ITimeReserved) {
    this.editForm.patchValue({
      id: timeReserved.id,
      date: timeReserved.date,
      time: timeReserved.time != null ? timeReserved.time.format(DATE_TIME_FORMAT) : null,
      description: timeReserved.description,
      counselorId: timeReserved.counselorId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const timeReserved = this.createFromForm();
    if (timeReserved.id !== undefined) {
      this.subscribeToSaveResponse(this.timeReservedService.update(timeReserved));
    } else {
      this.subscribeToSaveResponse(this.timeReservedService.create(timeReserved));
    }
  }

  private createFromForm(): ITimeReserved {
    return {
      ...new TimeReserved(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      time: this.editForm.get(['time']).value != null ? moment(this.editForm.get(['time']).value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description']).value,
      counselorId: this.editForm.get(['counselorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeReserved>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCounselorById(index: number, item: ICounselor) {
    return item.id;
  }
}
