import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICounselor } from 'app/shared/model/counselor.model';
import { CounselorService } from './counselor.service';

@Component({
  selector: 'jhi-counselor-delete-dialog',
  templateUrl: './counselor-delete-dialog.component.html'
})
export class CounselorDeleteDialogComponent {
  counselor: ICounselor;

  constructor(protected counselorService: CounselorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.counselorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'counselorListModification',
        content: 'Deleted an counselor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-counselor-delete-popup',
  template: ''
})
export class CounselorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ counselor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CounselorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.counselor = counselor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/counselor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/counselor', { outlets: { popup: null } }]);
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
