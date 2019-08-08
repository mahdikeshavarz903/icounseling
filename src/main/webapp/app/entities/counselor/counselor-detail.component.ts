import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICounselor } from 'app/shared/model/counselor.model';

@Component({
  selector: 'jhi-counselor-detail',
  templateUrl: './counselor-detail.component.html'
})
export class CounselorDetailComponent implements OnInit {
  counselor: ICounselor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ counselor }) => {
      this.counselor = counselor;
    });
  }

  previousState() {
    window.history.back();
  }
}
