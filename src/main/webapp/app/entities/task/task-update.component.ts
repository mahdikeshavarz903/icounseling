import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IReminder } from 'app/shared/model/reminder.model';
import { ReminderService } from 'app/entities/reminder';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IPlanning } from 'app/shared/model/planning.model';
import { PlanningService } from 'app/entities/planning';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  isSaving: boolean;

  reminders: IReminder[];

  schedules: ISchedule[];

  plannings: IPlanning[];

  editForm = this.fb.group({
    id: [],
    repeatTime: [null, [Validators.required]],
    repeatUntil: [null, [Validators.required]],
    reminderId: [],
    scheduleId: [],
    planningId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected taskService: TaskService,
    protected reminderService: ReminderService,
    protected scheduleService: ScheduleService,
    protected planningService: PlanningService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);
    });
    this.reminderService
      .query({ filter: 'task-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IReminder[]>) => mayBeOk.ok),
        map((response: HttpResponse<IReminder[]>) => response.body)
      )
      .subscribe(
        (res: IReminder[]) => {
          if (!!this.editForm.get('reminderId').value) {
            this.reminders = res;
          } else {
            this.reminderService
              .find(this.editForm.get('reminderId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IReminder>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IReminder>) => subResponse.body)
              )
              .subscribe(
                (subRes: IReminder) => (this.reminders = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.scheduleService
      .query({ filter: 'task-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ISchedule[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchedule[]>) => response.body)
      )
      .subscribe(
        (res: ISchedule[]) => {
          if (!!this.editForm.get('scheduleId').value) {
            this.schedules = res;
          } else {
            this.scheduleService
              .find(this.editForm.get('scheduleId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ISchedule>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ISchedule>) => subResponse.body)
              )
              .subscribe(
                (subRes: ISchedule) => (this.schedules = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.planningService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlanning[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlanning[]>) => response.body)
      )
      .subscribe((res: IPlanning[]) => (this.plannings = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(task: ITask) {
    this.editForm.patchValue({
      id: task.id,
      repeatTime: task.repeatTime,
      repeatUntil: task.repeatUntil,
      reminderId: task.reminderId,
      scheduleId: task.scheduleId,
      planningId: task.planningId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id']).value,
      repeatTime: this.editForm.get(['repeatTime']).value,
      repeatUntil: this.editForm.get(['repeatUntil']).value,
      reminderId: this.editForm.get(['reminderId']).value,
      scheduleId: this.editForm.get(['scheduleId']).value,
      planningId: this.editForm.get(['planningId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
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

  trackReminderById(index: number, item: IReminder) {
    return item.id;
  }

  trackScheduleById(index: number, item: ISchedule) {
    return item.id;
  }

  trackPlanningById(index: number, item: IPlanning) {
    return item.id;
  }
}
