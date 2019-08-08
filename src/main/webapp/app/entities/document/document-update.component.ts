import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IRate } from 'app/shared/model/rate.model';
import { RateService } from 'app/entities/rate';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from 'app/entities/comment';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { ICounselor } from 'app/shared/model/counselor.model';
import { CounselorService } from 'app/entities/counselor';

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
  isSaving: boolean;

  rates: IRate[];

  comments: IComment[];

  categories: ICategory[];

  counselors: ICounselor[];
  publishedDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    descriptionContentType: [],
    price: [null, [Validators.required]],
    publishedDate: [],
    paymentType: [],
    documentFormat: [],
    imagesGallery: [null, [Validators.required]],
    imagesGalleryContentType: [],
    tag: [null, [Validators.required]],
    rateId: [],
    commentId: [],
    gategoryId: [],
    counselorId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected documentService: DocumentService,
    protected rateService: RateService,
    protected commentService: CommentService,
    protected categoryService: CategoryService,
    protected counselorService: CounselorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ document }) => {
      this.updateForm(document);
    });
    this.rateService
      .query({ filter: 'document-is-null' })
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
    this.commentService
      .query({ filter: 'document-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IComment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComment[]>) => response.body)
      )
      .subscribe(
        (res: IComment[]) => {
          if (!this.editForm.get('commentId').value) {
            this.comments = res;
          } else {
            this.commentService
              .find(this.editForm.get('commentId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IComment>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IComment>) => subResponse.body)
              )
              .subscribe(
                (subRes: IComment) => (this.comments = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(document: IDocument) {
    this.editForm.patchValue({
      id: document.id,
      title: document.title,
      description: document.description,
      descriptionContentType: document.descriptionContentType,
      price: document.price,
      publishedDate: document.publishedDate,
      paymentType: document.paymentType,
      documentFormat: document.documentFormat,
      imagesGallery: document.imagesGallery,
      imagesGalleryContentType: document.imagesGalleryContentType,
      tag: document.tag,
      rateId: document.rateId,
      commentId: document.commentId,
      gategoryId: document.gategoryId,
      counselorId: document.counselorId
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const document = this.createFromForm();
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    return {
      ...new Document(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      descriptionContentType: this.editForm.get(['descriptionContentType']).value,
      description: this.editForm.get(['description']).value,
      price: this.editForm.get(['price']).value,
      publishedDate: this.editForm.get(['publishedDate']).value,
      paymentType: this.editForm.get(['paymentType']).value,
      documentFormat: this.editForm.get(['documentFormat']).value,
      imagesGalleryContentType: this.editForm.get(['imagesGalleryContentType']).value,
      imagesGallery: this.editForm.get(['imagesGallery']).value,
      tag: this.editForm.get(['tag']).value,
      rateId: this.editForm.get(['rateId']).value,
      commentId: this.editForm.get(['commentId']).value,
      gategoryId: this.editForm.get(['gategoryId']).value,
      counselorId: this.editForm.get(['counselorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
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

  trackRateById(index: number, item: IRate) {
    return item.id;
  }

  trackCommentById(index: number, item: IComment) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackCounselorById(index: number, item: ICounselor) {
    return item.id;
  }
}
