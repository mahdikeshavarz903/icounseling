import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Visitor from './visitor';
import VisitorDetail from './visitor-detail';
import VisitorUpdate from './visitor-update';
import VisitorDeleteDialog from './visitor-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisitorUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisitorUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisitorDetail}/>
      <ErrorBoundaryRoute path={match.url} component={Visitor}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VisitorDeleteDialog}/>
  </>
);

export default Routes;
