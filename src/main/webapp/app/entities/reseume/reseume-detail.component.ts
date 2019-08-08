import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReseume } from 'app/shared/model/reseume.model';

@Component({
  selector: 'jhi-reseume-detail',
  templateUrl: './reseume-detail.component.html'
})
export class ReseumeDetailComponent implements OnInit {
  reseume: IReseume;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reseume }) => {
      this.reseume = reseume;
    });
  }

  previousState() {
    window.history.back();
  }
}
