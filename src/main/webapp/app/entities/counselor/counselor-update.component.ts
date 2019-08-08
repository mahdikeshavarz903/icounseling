import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICounselor, Counselor } from 'app/shared/model/counselor.model';
import { CounselorService } from './counselor.service';
import { IEducation } from 'app/shared/model/education.model';
import { EducationService } from 'app/entities/education';
import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from 'app/entities/score';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-counselor-update',
  templateUrl: './counselor-update.component.html'
})
export class CounselorUpdateComponent implements OnInit {
  isSaving: boolean;

  educations: IEducation[];

  scores: IScore[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    consultantType: [null, [Validators.required]],
    educationId: [],
    scoreId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected counselorService: CounselorService,
    protected educationService: EducationService,
    protected scoreService: ScoreService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ counselor }) => {
      this.updateForm(counselor);
    });
    this.educationService
      .query({ filter: 'counselor-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IEducation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEducation[]>) => response.body)
      )
      .subscribe(
        (res: IEducation[]) => {
          if (!this.editForm.get('educationId').value) {
            this.educations = res;
          } else {
            this.educationService
              .find(this.editForm.get('educationId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IEducation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IEducation>) => subResponse.body)
              )
              .subscribe(
                (subRes: IEducation) => (this.educations = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.scoreService
      .query({ filter: 'counselor-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IScore[]>) => mayBeOk.ok),
        map((response: HttpResponse<IScore[]>) => response.body)
      )
      .subscribe(
        (res: IScore[]) => {
          if (!this.editForm.get('scoreId').value) {
            this.scores = res;
          } else {
            this.scoreService
              .find(this.editForm.get('scoreId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IScore>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IScore>) => subResponse.body)
              )
              .subscribe(
                (subRes: IScore) => (this.scores = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(counselor: ICounselor) {
    this.editForm.patchValue({
      id: counselor.id,
      consultantType: counselor.consultantType,
      educationId: counselor.educationId,
      scoreId: counselor.scoreId,
      userId: counselor.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const counselor = this.createFromForm();
    if (counselor.id !== undefined) {
      this.subscribeToSaveResponse(this.counselorService.update(counselor));
    } else {
      this.subscribeToSaveResponse(this.counselorService.create(counselor));
    }
  }

  private createFromForm(): ICounselor {
    return {
      ...new Counselor(),
      id: this.editForm.get(['id']).value,
      consultantType: this.editForm.get(['consultantType']).value,
      educationId: this.editForm.get(['educationId']).value,
      scoreId: this.editForm.get(['scoreId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICounselor>>) {
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

  trackScoreById(index: number, item: IScore) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
