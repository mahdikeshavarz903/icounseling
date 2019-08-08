import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICounselingCase } from 'app/shared/model/counseling-case.model';

@Component({
  selector: 'jhi-counseling-case-detail',
  templateUrl: './counseling-case-detail.component.html'
})
export class CounselingCaseDetailComponent implements OnInit {
  counselingCase: ICounselingCase;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ counselingCase }) => {
      this.counselingCase = counselingCase;
    });
  }

  previousState() {
    window.history.back();
  }
}
