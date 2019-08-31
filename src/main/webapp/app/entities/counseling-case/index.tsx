import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CounselingCase from './counseling-case';
import CounselingCaseDetail from './counseling-case-detail';
import CounselingCaseUpdate from './counseling-case-update';
import CounselingCaseDeleteDialog from './counseling-case-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CounselingCaseUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CounselingCaseUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CounselingCaseDetail}/>
      <ErrorBoundaryRoute path={match.url} component={CounselingCase}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CounselingCaseDeleteDialog}/>
  </>
);

export default Routes;
