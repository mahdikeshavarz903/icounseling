import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILibrary } from 'app/shared/model/library.model';

@Component({
  selector: 'jhi-library-detail',
  templateUrl: './library-detail.component.html'
})
export class LibraryDetailComponent implements OnInit {
  library: ILibrary;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ library }) => {
      this.library = library;
    });
  }

  previousState() {
    window.history.back();
  }
}
