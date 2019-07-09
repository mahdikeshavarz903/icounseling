import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'counseling-case',
        loadChildren: './counseling-case/counseling-case.module#ICounselingCounselingCaseModule'
      },
      {
        path: 'counselor',
        loadChildren: './counselor/counselor.module#ICounselingCounselorModule'
      },
      {
        path: 'reseume',
        loadChildren: './reseume/reseume.module#ICounselingReseumeModule'
      },
      {
        path: 'education',
        loadChildren: './education/education.module#ICounselingEducationModule'
      },
      {
        path: 'planning',
        loadChildren: './planning/planning.module#ICounselingPlanningModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#ICounselingTaskModule'
      },
      {
        path: 'reminder',
        loadChildren: './reminder/reminder.module#ICounselingReminderModule'
      },
      {
        path: 'time-reserved',
        loadChildren: './time-reserved/time-reserved.module#ICounselingTimeReservedModule'
      },
      {
        path: 'visitor',
        loadChildren: './visitor/visitor.module#ICounselingVisitorModule'
      },
      {
        path: 'job',
        loadChildren: './job/job.module#ICounselingJobModule'
      },
      {
        path: 'job-history',
        loadChildren: './job-history/job-history.module#ICounselingJobHistoryModule'
      },
      {
        path: 'schedule',
        loadChildren: './schedule/schedule.module#ICounselingScheduleModule'
      },
      {
        path: 'document',
        loadChildren: './document/document.module#ICounselingDocumentModule'
      },
      {
        path: 'post',
        loadChildren: './post/post.module#ICounselingPostModule'
      },
      {
        path: 'score',
        loadChildren: './score/score.module#ICounselingScoreModule'
      },
      {
        path: 'rate',
        loadChildren: './rate/rate.module#ICounselingRateModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#ICounselingCommentModule'
      },
      {
        path: 'library',
        loadChildren: './library/library.module#ICounselingLibraryModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#ICounselingCategoryModule'
      },
      {
        path: 'transaction',
        loadChildren: './transaction/transaction.module#ICounselingTransactionModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ICounselingEntityModule {}
