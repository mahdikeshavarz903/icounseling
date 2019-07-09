import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITimeReserved, TimeReserved } from 'app/shared/model/time-reserved.model';
import { TimeReservedService } from './time-reserved.service';
import { ICounselor } from 'app/shared/model/counselor.model';
import { CounselorService } from 'app/entities/counselor';

@Component({
  selector: 'jhi-time-reserved-update',
  templateUrl: './time-reserved-update.component.html'
})
export class TimeReservedUpdateComponent implements OnInit {
  isSaving: boolean;

  counselors: ICounselor[];
  dateDp: any;
  timeDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    time: [null, [Validators.required]],
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
      description: timeReserved.description,
      time: timeReserved.time,
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
      description: this.editForm.get(['description']).value,
      time: this.editForm.get(['time']).value,
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
