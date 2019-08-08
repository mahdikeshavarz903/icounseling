import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ILibrary, Library } from 'app/shared/model/library.model';
import { LibraryService } from './library.service';
import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from 'app/entities/visitor';

@Component({
  selector: 'jhi-library-update',
  templateUrl: './library-update.component.html'
})
export class LibraryUpdateComponent implements OnInit {
  isSaving: boolean;

  visitors: IVisitor[];
  creationTimeDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    creationTime: [null, [Validators.required]],
    visitorId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected libraryService: LibraryService,
    protected visitorService: VisitorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ library }) => {
      this.updateForm(library);
    });
    this.visitorService
      .query({ filter: 'library-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IVisitor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVisitor[]>) => response.body)
      )
      .subscribe(
        (res: IVisitor[]) => {
          if (!this.editForm.get('visitorId').value) {
            this.visitors = res;
          } else {
            this.visitorService
              .find(this.editForm.get('visitorId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IVisitor>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IVisitor>) => subResponse.body)
              )
              .subscribe(
                (subRes: IVisitor) => (this.visitors = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(library: ILibrary) {
    this.editForm.patchValue({
      id: library.id,
      name: library.name,
      creationTime: library.creationTime,
      visitorId: library.visitorId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const library = this.createFromForm();
    if (library.id !== undefined) {
      this.subscribeToSaveResponse(this.libraryService.update(library));
    } else {
      this.subscribeToSaveResponse(this.libraryService.create(library));
    }
  }

  private createFromForm(): ILibrary {
    return {
      ...new Library(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      creationTime: this.editForm.get(['creationTime']).value,
      visitorId: this.editForm.get(['visitorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibrary>>) {
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

  trackVisitorById(index: number, item: IVisitor) {
    return item.id;
  }
}
