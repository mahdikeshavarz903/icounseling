import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITimeReserved } from 'app/shared/model/time-reserved.model';
import { TimeReservedService } from './time-reserved.service';

@Component({
  selector: 'jhi-time-reserved-delete-dialog',
  templateUrl: './time-reserved-delete-dialog.component.html'
})
export class TimeReservedDeleteDialogComponent {
  timeReserved: ITimeReserved;

  constructor(
    protected timeReservedService: TimeReservedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.timeReservedService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'timeReservedListModification',
        content: 'Deleted an timeReserved'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-time-reserved-delete-popup',
  template: ''
})
export class TimeReservedDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ timeReserved }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TimeReservedDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.timeReserved = timeReserved;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/time-reserved', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/time-reserved', { outlets: { popup: null } }]);
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
