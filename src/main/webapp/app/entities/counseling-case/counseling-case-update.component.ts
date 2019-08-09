import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService} from 'ng-jhipster';
import {CounselingCase, ICounselingCase} from 'app/shared/model/counseling-case.model';
import {CounselingCaseService} from './counseling-case.service';
import {IVisitor} from 'app/shared/model/visitor.model';
import {VisitorService} from 'app/entities/visitor';
import {ICounselor} from 'app/shared/model/counselor.model';
import {CounselorService} from 'app/entities/counselor';

@Component({
  selector: 'jhi-counseling-case-update',
  templateUrl: './counseling-case-update.component.html'
})
export class CounselingCaseUpdateComponent implements OnInit {
  isSaving: boolean;

  visitors: IVisitor[];

  counselors: ICounselor[];

  editForm = this.fb.group({
    id: [],
    status: [null, [Validators.required]],
    visitorId: [],
    counselorId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected counselingCaseService: CounselingCaseService,
    protected visitorService: VisitorService,
    protected counselorService: CounselorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ counselingCase }) => {
      this.updateForm(counselingCase);
    });
    this.visitorService
      .query({ filter: 'counselingcase-is-null' })
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
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(counselingCase: ICounselingCase) {
    this.editForm.patchValue({
      id: counselingCase.id,
      status: counselingCase.status,
      visitorId: counselingCase.visitorId,
      counselorId: counselingCase.counselorId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const counselingCase = this.createFromForm();
    if (counselingCase.id !== undefined) {
      this.subscribeToSaveResponse(this.counselingCaseService.update(counselingCase));
    } else {
      this.subscribeToSaveResponse(this.counselingCaseService.create(counselingCase));
    }
  }

  private createFromForm(): ICounselingCase {
    return {
      ...new CounselingCase(),
      id: this.editForm.get(['id']).value,
      status: this.editForm.get(['status']).value,
      visitorId: this.editForm.get(['visitorId']).value,
      counselorId: this.editForm.get(['counselorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICounselingCase>>) {
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

  trackCounselorById(index: number, item: ICounselor) {
    return item.id;
  }
}
