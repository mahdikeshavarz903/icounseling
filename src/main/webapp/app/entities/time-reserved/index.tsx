import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TimeReserved from './time-reserved';
import TimeReservedDetail from './time-reserved-detail';
import TimeReservedUpdate from './time-reserved-update';
import TimeReservedDeleteDialog from './time-reserved-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimeReservedUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimeReservedUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimeReservedDetail}/>
      <ErrorBoundaryRoute path={match.url} component={TimeReserved}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TimeReservedDeleteDialog}/>
  </>
);

export default Routes;
