import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReseume } from 'app/shared/model/reseume.model';
import { ReseumeService } from './reseume.service';

@Component({
  selector: 'jhi-reseume-delete-dialog',
  templateUrl: './reseume-delete-dialog.component.html'
})
export class ReseumeDeleteDialogComponent {
  reseume: IReseume;

  constructor(protected reseumeService: ReseumeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reseumeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reseumeListModification',
        content: 'Deleted an reseume'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reseume-delete-popup',
  template: ''
})
export class ReseumeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reseume }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReseumeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reseume = reseume;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reseume', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reseume', { outlets: { popup: null } }]);
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
