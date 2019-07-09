import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeReserved } from 'app/shared/model/time-reserved.model';

@Component({
  selector: 'jhi-time-reserved-detail',
  templateUrl: './time-reserved-detail.component.html'
})
export class TimeReservedDetailComponent implements OnInit {
  timeReserved: ITimeReserved;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ timeReserved }) => {
      this.timeReserved = timeReserved;
    });
  }

  previousState() {
    window.history.back();
  }
}
