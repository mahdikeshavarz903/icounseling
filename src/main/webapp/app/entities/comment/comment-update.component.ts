import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComment, Comment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IRate } from 'app/shared/model/rate.model';
import { RateService } from 'app/entities/rate';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { IPost } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';

@Component({
  selector: 'jhi-comment-update',
  templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
  isSaving: boolean;

  schedules: ISchedule[];

  rates: IRate[];

  documents: IDocument[];

  posts: IPost[];

  editForm = this.fb.group({
    id: [],
    scheduleId: [],
    rateId: [],
    postId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commentService: CommentService,
    protected scheduleService: ScheduleService,
    protected rateService: RateService,
    protected documentService: DocumentService,
    protected postService: PostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ comment }) => {
      this.updateForm(comment);
    });
    this.scheduleService
      .query({ filter: 'comment-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ISchedule[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchedule[]>) => response.body)
      )
      .subscribe(
        (res: ISchedule[]) => {
          if (!this.editForm.get('scheduleId').value) {
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
    this.rateService
      .query({ filter: 'comment-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRate[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRate[]>) => response.body)
      )
      .subscribe(
        (res: IRate[]) => {
          if (!this.editForm.get('rateId').value) {
            this.rates = res;
          } else {
            this.rateService
              .find(this.editForm.get('rateId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRate>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRate>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRate) => (this.rates = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.documentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocument[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocument[]>) => response.body)
      )
      .subscribe((res: IDocument[]) => (this.documents = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.postService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPost[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPost[]>) => response.body)
      )
      .subscribe((res: IPost[]) => (this.posts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(comment: IComment) {
    this.editForm.patchValue({
      id: comment.id,
      scheduleId: comment.scheduleId,
      rateId: comment.rateId,
      postId: comment.postId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const comment = this.createFromForm();
    if (comment.id !== undefined) {
      this.subscribeToSaveResponse(this.commentService.update(comment));
    } else {
      this.subscribeToSaveResponse(this.commentService.create(comment));
    }
  }

  private createFromForm(): IComment {
    return {
      ...new Comment(),
      id: this.editForm.get(['id']).value,
      scheduleId: this.editForm.get(['scheduleId']).value,
      rateId: this.editForm.get(['rateId']).value,
      postId: this.editForm.get(['postId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
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

  trackScheduleById(index: number, item: ISchedule) {
    return item.id;
  }

  trackRateById(index: number, item: IRate) {
    return item.id;
  }

  trackDocumentById(index: number, item: IDocument) {
    return item.id;
  }

  trackPostById(index: number, item: IPost) {
    return item.id;
  }
}
