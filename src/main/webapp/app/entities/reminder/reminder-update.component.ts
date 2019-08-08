import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IReminder, Reminder } from 'app/shared/model/reminder.model';
import { ReminderService } from './reminder.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
  selector: 'jhi-reminder-update',
  templateUrl: './reminder-update.component.html'
})
export class ReminderUpdateComponent implements OnInit {
  isSaving: boolean;

  tasks: ITask[];
  dateDp: any;
  timeDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    time: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected reminderService: ReminderService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reminder }) => {
      this.updateForm(reminder);
    });
    this.taskService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITask[]>) => response.body)
      )
      .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(reminder: IReminder) {
    this.editForm.patchValue({
      id: reminder.id,
      date: reminder.date,
      time: reminder.time
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reminder = this.createFromForm();
    if (reminder.id !== undefined) {
      this.subscribeToSaveResponse(this.reminderService.update(reminder));
    } else {
      this.subscribeToSaveResponse(this.reminderService.create(reminder));
    }
  }

  private createFromForm(): IReminder {
    return {
      ...new Reminder(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      time: this.editForm.get(['time']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReminder>>) {
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

  trackTaskById(index: number, item: ITask) {
    return item.id;
  }
}
