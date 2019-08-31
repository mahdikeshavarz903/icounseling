import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  getPaginationItemsNumber,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  TextFormat,
  Translate
} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './planning.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IPlanningProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type IPlanningState = IPaginationBaseState;

export class Planning extends React.Component<IPlanningProps, IPlanningState> {
  state: IPlanningState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({activePage}, () => this.sortEntities());

  getEntities = () => {
    const {activePage, itemsPerPage, sort, order} = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const {planningList, match, totalItems} = this.props;
    return (
      <div>
        <h2 id="planning-heading">
          <Translate contentKey="iCounselingApp.planning.home.title">Plannings</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="iCounselingApp.planning.home.createLabel">Create new Planning</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={this.sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('title')}>
                <Translate contentKey="iCounselingApp.planning.title">Title</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('startDateTime')}>
                <Translate contentKey="iCounselingApp.planning.startDateTime">Start Date Time</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('endDateTime')}>
                <Translate contentKey="iCounselingApp.planning.endDateTime">End Date Time</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('description')}>
                <Translate contentKey="iCounselingApp.planning.description">Description</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.planning.counselor">Counselor</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {planningList.map((planning, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${planning.id}`} color="link" size="sm">
                    {planning.id}
                  </Button>
                </td>
                <td>{planning.title}</td>
                <td>
                  <TextFormat type="date" value={planning.startDateTime} format={APP_DATE_FORMAT}/>
                </td>
                <td>
                  <TextFormat type="date" value={planning.endDateTime} format={APP_DATE_FORMAT}/>
                </td>
                <td>{planning.description}</td>
                <td>{planning.counselorId ?
                  <Link to={`counselor/${planning.counselorId}`}>{planning.counselorId}</Link> : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${planning.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${planning.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${planning.id}/delete`} color="danger" size="sm">
                      <FontAwesomeIcon icon="trash"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({planning}: IRootState) => ({
  planningList: planning.entities,
  totalItems: planning.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);
