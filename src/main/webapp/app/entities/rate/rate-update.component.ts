import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRate, Rate } from 'app/shared/model/rate.model';
import { RateService } from './rate.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from 'app/entities/comment';

@Component({
  selector: 'jhi-rate-update',
  templateUrl: './rate-update.component.html'
})
export class RateUpdateComponent implements OnInit {
  isSaving: boolean;

  documents: IDocument[];

  comments: IComment[];

  editForm = this.fb.group({
    id: [],
    index: [null, [Validators.required]],
    title: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rateService: RateService,
    protected documentService: DocumentService,
    protected commentService: CommentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rate }) => {
      this.updateForm(rate);
    });
    this.documentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocument[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocument[]>) => response.body)
      )
      .subscribe((res: IDocument[]) => (this.documents = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.commentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComment[]>) => response.body)
      )
      .subscribe((res: IComment[]) => (this.comments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rate: IRate) {
    this.editForm.patchValue({
      id: rate.id,
      index: rate.index,
      title: rate.title
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rate = this.createFromForm();
    if (rate.id !== undefined) {
      this.subscribeToSaveResponse(this.rateService.update(rate));
    } else {
      this.subscribeToSaveResponse(this.rateService.create(rate));
    }
  }

  private createFromForm(): IRate {
    return {
      ...new Rate(),
      id: this.editForm.get(['id']).value,
      index: this.editForm.get(['index']).value,
      title: this.editForm.get(['title']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRate>>) {
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

  trackDocumentById(index: number, item: IDocument) {
    return item.id;
  }

  trackCommentById(index: number, item: IComment) {
    return item.id;
  }
}
