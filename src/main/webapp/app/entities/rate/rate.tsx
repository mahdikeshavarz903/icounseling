import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {getPaginationItemsNumber, getSortState, IPaginationBaseState, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './rate.reducer';
// tslint:disable-next-line:no-unused-variable
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IRateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type IRateState = IPaginationBaseState;

export class Rate extends React.Component<IRateProps, IRateState> {
  state: IRateState = {
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
    const {rateList, match, totalItems} = this.props;
    return (
      <div>
        <h2 id="rate-heading">
          <Translate contentKey="iCounselingApp.rate.home.title">Rates</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="iCounselingApp.rate.home.createLabel">Create new Rate</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={this.sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('index')}>
                <Translate contentKey="iCounselingApp.rate.index">Index</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('title')}>
                <Translate contentKey="iCounselingApp.rate.title">Title</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {rateList.map((rate, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${rate.id}`} color="link" size="sm">
                    {rate.id}
                  </Button>
                </td>
                <td>{rate.index}</td>
                <td>{rate.title}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${rate.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${rate.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${rate.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({rate}: IRootState) => ({
  rateList: rate.entities,
  totalItems: rate.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rate);
