import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILibrary } from 'app/shared/model/library.model';
import { LibraryService } from './library.service';

@Component({
  selector: 'jhi-library-delete-dialog',
  templateUrl: './library-delete-dialog.component.html'
})
export class LibraryDeleteDialogComponent {
  library: ILibrary;

  constructor(protected libraryService: LibraryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.libraryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'libraryListModification',
        content: 'Deleted an library'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-library-delete-popup',
  template: ''
})
export class LibraryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ library }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LibraryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.library = library;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/library', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/library', { outlets: { popup: null } }]);
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
