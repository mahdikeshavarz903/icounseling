import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CounselingCase from './counseling-case';
import Counselor from './counselor';
import Reseume from './reseume';
import Education from './education';
import Planning from './planning';
import Task from './task';
import Reminder from './reminder';
import TimeReserved from './time-reserved';
import Visitor from './visitor';
import Job from './job';
import JobHistory from './job-history';
import Schedule from './schedule';
import Document from './document';
import Post from './post';
import Score from './score';
import Rate from './rate';
import Comment from './comment';
import Library from './library';
import Category from './category';
import Transaction from './transaction';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/counseling-case`} component={CounselingCase} />
      <ErrorBoundaryRoute path={`${match.url}/counselor`} component={Counselor} />
      <ErrorBoundaryRoute path={`${match.url}/reseume`} component={Reseume} />
      <ErrorBoundaryRoute path={`${match.url}/education`} component={Education} />
      <ErrorBoundaryRoute path={`${match.url}/planning`} component={Planning} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/reminder`} component={Reminder} />
      <ErrorBoundaryRoute path={`${match.url}/time-reserved`} component={TimeReserved} />
      <ErrorBoundaryRoute path={`${match.url}/visitor`} component={Visitor} />
      <ErrorBoundaryRoute path={`${match.url}/job`} component={Job} />
      <ErrorBoundaryRoute path={`${match.url}/job-history`} component={JobHistory} />
      <ErrorBoundaryRoute path={`${match.url}/schedule`} component={Schedule} />
      <ErrorBoundaryRoute path={`${match.url}/document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}/post`} component={Post} />
      <ErrorBoundaryRoute path={`${match.url}/score`} component={Score} />
      <ErrorBoundaryRoute path={`${match.url}/rate`} component={Rate} />
      <ErrorBoundaryRoute path={`${match.url}/comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}/library`} component={Library} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}/transaction`} component={Transaction} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
