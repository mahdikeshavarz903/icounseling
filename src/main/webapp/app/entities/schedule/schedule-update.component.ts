import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISchedule, Schedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';
import { IPost } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from 'app/entities/comment';

@Component({
  selector: 'jhi-schedule-update',
  templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
  isSaving: boolean;

  tasks: ITask[];

  posts: IPost[];

  comments: IComment[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    dateAndTime: [null, [Validators.required]],
    description: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected scheduleService: ScheduleService,
    protected taskService: TaskService,
    protected postService: PostService,
    protected commentService: CommentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.updateForm(schedule);
    });
    this.taskService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITask[]>) => response.body)
      )
      .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.postService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPost[]>) => response.body)
      )
      .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.commentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComment[]>) => response.body)
      )
      .subscribe((res: IComment[]) => (this.comments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(schedule: ISchedule) {
    this.editForm.patchValue({
      id: schedule.id,
      title: schedule.title,
      dateAndTime: schedule.dateAndTime != null ? schedule.dateAndTime.format(DATE_TIME_FORMAT) : null,
      description: schedule.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const schedule = this.createFromForm();
    if (schedule.id !== undefined) {
      this.subscribeToSaveResponse(this.scheduleService.update(schedule));
    } else {
      this.subscribeToSaveResponse(this.scheduleService.create(schedule));
    }
  }

  private createFromForm(): ISchedule {
    return {
      ...new Schedule(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      dateAndTime:
        this.editForm.get(['dateAndTime']).value != null ? moment(this.editForm.get(['dateAndTime']).value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
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

  trackPostById(index: number, item: IPost) {
    return item.id;
  }

  trackCommentById(index: number, item: IComment) {
    return item.id;
  }
}
