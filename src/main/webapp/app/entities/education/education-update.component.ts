import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEducation, Education } from 'app/shared/model/education.model';
import { EducationService } from './education.service';
import { ICounselor } from 'app/shared/model/counselor.model';
import { CounselorService } from 'app/entities/counselor';
import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from 'app/entities/visitor';

@Component({
  selector: 'jhi-education-update',
  templateUrl: './education-update.component.html'
})
export class EducationUpdateComponent implements OnInit {
  isSaving: boolean;

  counselors: ICounselor[];

  visitors: IVisitor[];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected educationService: EducationService,
    protected counselorService: CounselorService,
    protected visitorService: VisitorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ education }) => {
      this.updateForm(education);
    });
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.visitorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVisitor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVisitor[]>) => response.body)
      )
      .subscribe((res: IVisitor[]) => (this.visitors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(education: IEducation) {
    this.editForm.patchValue({
      id: education.id,
      type: education.type
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const education = this.createFromForm();
    if (education.id !== undefined) {
      this.subscribeToSaveResponse(this.educationService.update(education));
    } else {
      this.subscribeToSaveResponse(this.educationService.create(education));
    }
  }

  private createFromForm(): IEducation {
    return {
      ...new Education(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEducation>>) {
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

  trackVisitorById(index: number, item: IVisitor) {
    return item.id;
  }
}
