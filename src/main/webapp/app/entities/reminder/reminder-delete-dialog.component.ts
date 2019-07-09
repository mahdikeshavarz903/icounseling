import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReminder } from 'app/shared/model/reminder.model';
import { ReminderService } from './reminder.service';

@Component({
  selector: 'jhi-reminder-delete-dialog',
  templateUrl: './reminder-delete-dialog.component.html'
})
export class ReminderDeleteDialogComponent {
  reminder: IReminder;

  constructor(protected reminderService: ReminderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reminderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reminderListModification',
        content: 'Deleted an reminder'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reminder-delete-popup',
  template: ''
})
export class ReminderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reminder }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReminderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reminder = reminder;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reminder', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reminder', { outlets: { popup: null } }]);
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
