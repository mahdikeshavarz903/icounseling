import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IJobHistory, JobHistory } from 'app/shared/model/job-history.model';
import { JobHistoryService } from './job-history.service';
import { IJob } from 'app/shared/model/job.model';
import { JobService } from 'app/entities/job';

@Component({
  selector: 'jhi-job-history-update',
  templateUrl: './job-history-update.component.html'
})
export class JobHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  jobs: IJob[];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    jobId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobHistoryService: JobHistoryService,
    protected jobService: JobService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.updateForm(jobHistory);
    });
    this.jobService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IJob[]>) => mayBeOk.ok),
        map((response: HttpResponse<IJob[]>) => response.body)
      )
      .subscribe(
        (res: IJob[]) => {
          if (!!this.editForm.get('jobId').value) {
            this.jobs = res;
          } else {
            this.jobService
              .find(this.editForm.get('jobId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IJob>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IJob>) => subResponse.body)
              )
              .subscribe((subRes: IJob) => (this.jobs = [subRes].concat(res)), (subRes: HttpErrorResponse) => this.onError(subRes.message));
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(jobHistory: IJobHistory) {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate != null ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate != null ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      jobId: jobHistory.jobId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistory {
    return {
      ...new JobHistory(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      jobId: this.editForm.get(['jobId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistory>>) {
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

  trackJobById(index: number, item: IJob) {
    return item.id;
  }
}
