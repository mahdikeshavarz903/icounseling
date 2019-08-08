import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'counseling-case',
        loadChildren: () => import('./counseling-case/counseling-case.module').then(m => m.ICounselingCounselingCaseModule)
      },
      {
        path: 'reseume',
        loadChildren: () => import('./reseume/reseume.module').then(m => m.ICounselingReseumeModule)
      },
      {
        path: 'education',
        loadChildren: () => import('./education/education.module').then(m => m.ICounselingEducationModule)
      },
      {
        path: 'planning',
        loadChildren: () => import('./planning/planning.module').then(m => m.ICounselingPlanningModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.ICounselingTaskModule)
      },
      {
        path: 'reminder',
        loadChildren: () => import('./reminder/reminder.module').then(m => m.ICounselingReminderModule)
      },
      {
        path: 'time-reserved',
        loadChildren: () => import('./time-reserved/time-reserved.module').then(m => m.ICounselingTimeReservedModule)
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.ICounselingJobModule)
      },
      {
        path: 'job-history',
        loadChildren: () => import('./job-history/job-history.module').then(m => m.ICounselingJobHistoryModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ICounselingScheduleModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.ICounselingDocumentModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./post/post.module').then(m => m.ICounselingPostModule)
      },
      {
        path: 'score',
        loadChildren: () => import('./score/score.module').then(m => m.ICounselingScoreModule)
      },
      {
        path: 'rate',
        loadChildren: () => import('./rate/rate.module').then(m => m.ICounselingRateModule)
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.ICounselingCommentModule)
      },
      {
        path: 'library',
        loadChildren: () => import('./library/library.module').then(m => m.ICounselingLibraryModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.ICounselingCategoryModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.ICounselingTransactionModule)
      },
      {
        path: 'counselor',
        loadChildren: () => import('./counselor/counselor.module').then(m => m.ICounselingCounselorModule)
      },
      {
        path: 'visitor',
        loadChildren: () => import('./visitor/visitor.module').then(m => m.ICounselingVisitorModule)
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
