import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Rate from './rate';
import RateDetail from './rate-detail';
import RateUpdate from './rate-update';
import RateDeleteDialog from './rate-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RateUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RateUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RateDetail}/>
      <ErrorBoundaryRoute path={match.url} component={Rate}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RateDeleteDialog}/>
  </>
);

export default Routes;
