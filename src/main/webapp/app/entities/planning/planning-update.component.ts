import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlanning, Planning } from 'app/shared/model/planning.model';
import { PlanningService } from './planning.service';
import { ICounselor } from 'app/shared/model/counselor.model';
import { CounselorService } from 'app/entities/counselor';

@Component({
  selector: 'jhi-planning-update',
  templateUrl: './planning-update.component.html'
})
export class PlanningUpdateComponent implements OnInit {
  isSaving: boolean;

  counselors: ICounselor[];

  editForm = this.fb.group({
    id: [],
    counselorId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected planningService: PlanningService,
    protected counselorService: CounselorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planning }) => {
      this.updateForm(planning);
    });
    this.counselorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICounselor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICounselor[]>) => response.body)
      )
      .subscribe((res: ICounselor[]) => (this.counselors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planning: IPlanning) {
    this.editForm.patchValue({
      id: planning.id,
      counselorId: planning.counselorId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planning = this.createFromForm();
    if (planning.id !== undefined) {
      this.subscribeToSaveResponse(this.planningService.update(planning));
    } else {
      this.subscribeToSaveResponse(this.planningService.create(planning));
    }
  }

  private createFromForm(): IPlanning {
    return {
      ...new Planning(),
      id: this.editForm.get(['id']).value,
      counselorId: this.editForm.get(['counselorId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanning>>) {
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
}
