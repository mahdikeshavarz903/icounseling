import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {JhiAlertService} from 'ng-jhipster';
import {IPlanning, Planning} from 'app/shared/model/planning.model';
import {PlanningService} from './planning.service';
import {ICounselor} from 'app/shared/model/counselor.model';
import {CounselorService} from 'app/entities/counselor';

@Component({
  selector: 'jhi-planning-update',
  templateUrl: './planning-update.component.html'
})
export class PlanningUpdateComponent implements OnInit {
  isSaving: boolean;

  counselors: ICounselor[];
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    description: [null, [Validators.required]],
    counselorId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected planningService: PlanningService,
    protected counselorService: CounselorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planning }) => {
      this.updateForm(planning);
    });
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planning: IPlanning) {
    this.editForm.patchValue({
      id: planning.id,
      title: planning.title,
      startDate: planning.startDate,
      startTime: planning.startTime != null ? planning.startTime.format(DATE_TIME_FORMAT) : null,
      endDate: planning.endDate,
      endTime: planning.endTime != null ? planning.endTime.format(DATE_TIME_FORMAT) : null,
      description: planning.description,
      counselorId: planning.counselorId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planning = this.createFromForm();
    if (planning.id !== undefined) {
      this.subscribeToSaveResponse(this.planningService.update(planning));
    } else {
      this.subscribeToSaveResponse(this.planningService.create(planning));
    }
  }

  private createFromForm(): IPlanning {
    return {
      ...new Planning(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      startDate: this.editForm.get(['startDate']).value,
      startTime:
        this.editForm.get(['startTime']).value != null ? moment(this.editForm.get(['startTime']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value,
      endTime: this.editForm.get(['endTime']).value != null ? moment(this.editForm.get(['endTime']).value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description']).value,
      counselorId: this.editForm.get(['counselorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanning>>) {
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
