import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Counselor from './counselor';
import CounselorDetail from './counselor-detail';
import CounselorUpdate from './counselor-update';
import CounselorDeleteDialog from './counselor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CounselorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CounselorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CounselorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Counselor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CounselorDeleteDialog} />
  </>
);

export default Routes;
