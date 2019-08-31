import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Reseume from './reseume';
import ReseumeDetail from './reseume-detail';
import ReseumeUpdate from './reseume-update';
import ReseumeDeleteDialog from './reseume-delete-dialog';

const Routes = ({match}) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReseumeUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReseumeUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReseumeDetail}/>
      <ErrorBoundaryRoute path={match.url} component={Reseume}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ReseumeDeleteDialog}/>
  </>
);

export default Routes;
