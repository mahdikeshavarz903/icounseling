import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import locale, {LocaleState} from './locale';
import authentication, {AuthenticationState} from './authentication';
import applicationProfile, {ApplicationProfileState} from './application-profile';

import administration, {AdministrationState} from 'app/modules/administration/administration.reducer';
import userManagement, {UserManagementState} from 'app/modules/administration/user-management/user-management.reducer';
import register, {RegisterState} from 'app/modules/account/register/register.reducer';
import activate, {ActivateState} from 'app/modules/account/activate/activate.reducer';
import password, {PasswordState} from 'app/modules/account/password/password.reducer';
import settings, {SettingsState} from 'app/modules/account/settings/settings.reducer';
import passwordReset, {PasswordResetState} from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import counselingCase, {CounselingCaseState} from 'app/entities/counseling-case/counseling-case.reducer';
// prettier-ignore
import counselor, {CounselorState} from 'app/entities/counselor/counselor.reducer';
// prettier-ignore
import reseume, {ReseumeState} from 'app/entities/reseume/reseume.reducer';
// prettier-ignore
import education, {EducationState} from 'app/entities/education/education.reducer';
// prettier-ignore
import planning, {PlanningState} from 'app/entities/planning/planning.reducer';
// prettier-ignore
import task, {TaskState} from 'app/entities/task/task.reducer';
// prettier-ignore
import reminder, {ReminderState} from 'app/entities/reminder/reminder.reducer';
// prettier-ignore
import timeReserved, {TimeReservedState} from 'app/entities/time-reserved/time-reserved.reducer';
// prettier-ignore
import visitor, {VisitorState} from 'app/entities/visitor/visitor.reducer';
// prettier-ignore
import job, {JobState} from 'app/entities/job/job.reducer';
// prettier-ignore
import jobHistory, {JobHistoryState} from 'app/entities/job-history/job-history.reducer';
// prettier-ignore
import schedule, {ScheduleState} from 'app/entities/schedule/schedule.reducer';
// prettier-ignore
import document, {DocumentState} from 'app/entities/document/document.reducer';
// prettier-ignore
import post, {PostState} from 'app/entities/post/post.reducer';
// prettier-ignore
import score, {ScoreState} from 'app/entities/score/score.reducer';
// prettier-ignore
import rate, {RateState} from 'app/entities/rate/rate.reducer';
// prettier-ignore
import comment, {CommentState} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import library, {LibraryState} from 'app/entities/library/library.reducer';
// prettier-ignore
import category, {CategoryState} from 'app/entities/category/category.reducer';
// prettier-ignore
import transaction, {TransactionState} from 'app/entities/transaction/transaction.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly counselingCase: CounselingCaseState;
  readonly counselor: CounselorState;
  readonly reseume: ReseumeState;
  readonly education: EducationState;
  readonly planning: PlanningState;
  readonly task: TaskState;
  readonly reminder: ReminderState;
  readonly timeReserved: TimeReservedState;
  readonly visitor: VisitorState;
  readonly job: JobState;
  readonly jobHistory: JobHistoryState;
  readonly schedule: ScheduleState;
  readonly document: DocumentState;
  readonly post: PostState;
  readonly score: ScoreState;
  readonly rate: RateState;
  readonly comment: CommentState;
  readonly library: LibraryState;
  readonly category: CategoryState;
  readonly transaction: TransactionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  counselingCase,
  counselor,
  reseume,
  education,
  planning,
  task,
  reminder,
  timeReserved,
  visitor,
  job,
  jobHistory,
  schedule,
  document,
  post,
  score,
  rate,
  comment,
  library,
  category,
  transaction,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
