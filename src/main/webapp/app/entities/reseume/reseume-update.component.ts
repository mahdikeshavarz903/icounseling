import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IReseume, Reseume } from 'app/shared/model/reseume.model';
import { ReseumeService } from './reseume.service';
import { IEducation } from 'app/shared/model/education.model';
import { EducationService } from 'app/entities/education';

@Component({
  selector: 'jhi-reseume-update',
  templateUrl: './reseume-update.component.html'
})
export class ReseumeUpdateComponent implements OnInit {
  isSaving: boolean;

  educations: IEducation[];

  editForm = this.fb.group({
    id: [],
    educationId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected reseumeService: ReseumeService,
    protected educationService: EducationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reseume }) => {
      this.updateForm(reseume);
    });
    this.educationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEducation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEducation[]>) => response.body)
      )
      .subscribe((res: IEducation[]) => (this.educations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(reseume: IReseume) {
    this.editForm.patchValue({
      id: reseume.id,
      educationId: reseume.educationId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reseume = this.createFromForm();
    if (reseume.id !== undefined) {
      this.subscribeToSaveResponse(this.reseumeService.update(reseume));
    } else {
      this.subscribeToSaveResponse(this.reseumeService.create(reseume));
    }
  }

  private createFromForm(): IReseume {
    return {
      ...new Reseume(),
      id: this.editForm.get(['id']).value,
      educationId: this.editForm.get(['educationId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReseume>>) {
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

  trackEducationById(index: number, item: IEducation) {
    return item.id;
  }
}
