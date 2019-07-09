import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';

@Component({
  selector: 'jhi-visitor-delete-dialog',
  templateUrl: './visitor-delete-dialog.component.html'
})
export class VisitorDeleteDialogComponent {
  visitor: IVisitor;

  constructor(protected visitorService: VisitorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.visitorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'visitorListModification',
        content: 'Deleted an visitor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-visitor-delete-popup',
  template: ''
})
export class VisitorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ visitor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VisitorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.visitor = visitor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/visitor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/visitor', { outlets: { popup: null } }]);
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
