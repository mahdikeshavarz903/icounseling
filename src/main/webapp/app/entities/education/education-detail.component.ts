import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEducation } from 'app/shared/model/education.model';

@Component({
  selector: 'jhi-education-detail',
  templateUrl: './education-detail.component.html'
})
export class EducationDetailComponent implements OnInit {
  education: IEducation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ education }) => {
      this.education = education;
    });
  }

  previousState() {
    window.history.back();
  }
}
