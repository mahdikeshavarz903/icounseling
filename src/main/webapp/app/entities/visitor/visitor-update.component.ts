import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService} from 'ng-jhipster';
import {IVisitor, Visitor} from 'app/shared/model/visitor.model';
import {VisitorService} from './visitor.service';
import {IScore} from 'app/shared/model/score.model';
import {ScoreService} from 'app/entities/score';
import {IEducation} from 'app/shared/model/education.model';
import {EducationService} from 'app/entities/education';
import {IUser, UserService} from 'app/core';
import {ICounselingCase} from 'app/shared/model/counseling-case.model';
import {CounselingCaseService} from 'app/entities/counseling-case';
import {ILibrary} from 'app/shared/model/library.model';
import {LibraryService} from 'app/entities/library';

@Component({
  selector: 'jhi-visitor-update',
  templateUrl: './visitor-update.component.html'
})
export class VisitorUpdateComponent implements OnInit {
  isSaving: boolean;

  scores: IScore[];

  educations: IEducation[];

  users: IUser[];

  counselingcases: ICounselingCase[];

  libraries: ILibrary[];

  editForm = this.fb.group({
    id: [],
    scoreId: [],
    educationId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected visitorService: VisitorService,
    protected scoreService: ScoreService,
    protected educationService: EducationService,
    protected userService: UserService,
    protected counselingCaseService: CounselingCaseService,
    protected libraryService: LibraryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ visitor }) => {
      this.updateForm(visitor);
    });
    this.scoreService
      .query({ filter: 'visitor-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IScore[]>) => mayBeOk.ok),
        map((response: HttpResponse<IScore[]>) => response.body)
      )
      .subscribe(
        (res: IScore[]) => {
          if (!!this.editForm.get('scoreId').value) {
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
    this.educationService
      .query({ filter: 'visitor-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IEducation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEducation[]>) => response.body)
      )
      .subscribe(
        (res: IEducation[]) => {
          if (!!this.editForm.get('educationId').value) {
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
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.counselingCaseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselingCase[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselingCase[]>) => response.body)
      )
      .subscribe((res: ICounselingCase[]) => (this.counselingcases = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.libraryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILibrary[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILibrary[]>) => response.body)
      )
      .subscribe((res: ILibrary[]) => (this.libraries = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(visitor: IVisitor) {
    this.editForm.patchValue({
      id: visitor.id,
      scoreId: visitor.scoreId,
      educationId: visitor.educationId,
      userId: visitor.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const visitor = this.createFromForm();
    if (visitor.id !== undefined) {
      this.subscribeToSaveResponse(this.visitorService.update(visitor));
    } else {
      this.subscribeToSaveResponse(this.visitorService.create(visitor));
    }
  }

  private createFromForm(): IVisitor {
    return {
      ...new Visitor(),
      id: this.editForm.get(['id']).value,
      scoreId: this.editForm.get(['scoreId']).value,
      educationId: this.editForm.get(['educationId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitor>>) {
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

  trackScoreById(index: number, item: IScore) {
    return item.id;
  }

  trackEducationById(index: number, item: IEducation) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackCounselingCaseById(index: number, item: ICounselingCase) {
    return item.id;
  }

  trackLibraryById(index: number, item: ILibrary) {
    return item.id;
  }
}
