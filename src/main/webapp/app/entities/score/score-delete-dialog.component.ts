import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';

@Component({
  selector: 'jhi-score-delete-dialog',
  templateUrl: './score-delete-dialog.component.html'
})
export class ScoreDeleteDialogComponent {
  score: IScore;

  constructor(protected scoreService: ScoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.scoreService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'scoreListModification',
        content: 'Deleted an score'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-score-delete-popup',
  template: ''
})
export class ScoreDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ score }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ScoreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.score = score;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/score', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/score', { outlets: { popup: null } }]);
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
