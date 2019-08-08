import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselingCase } from 'app/shared/model/counseling-case.model';
import { CounselingCaseService } from './counseling-case.service';

@Component({
  selector: 'jhi-counseling-case-delete-dialog',
  templateUrl: './counseling-case-delete-dialog.component.html'
})
export class CounselingCaseDeleteDialogComponent {
  counselingCase: ICounselingCase;

  constructor(
    protected counselingCaseService: CounselingCaseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.counselingCaseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'counselingCaseListModification',
        content: 'Deleted an counselingCase'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-counseling-case-delete-popup',
  template: ''
})
export class CounselingCaseDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ counselingCase }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CounselingCaseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.counselingCase = counselingCase;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/counseling-case', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/counseling-case', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
