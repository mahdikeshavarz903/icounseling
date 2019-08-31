import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Planning from './planning';
import PlanningDetail from './planning-detail';
import PlanningUpdate from './planning-update';
import PlanningDeleteDialog from './planning-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlanningUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlanningUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlanningDetail}/>
      <ErrorBoundaryRoute path={match.url} component={Planning}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PlanningDeleteDialog}/>
  </>
);

export default Routes;
