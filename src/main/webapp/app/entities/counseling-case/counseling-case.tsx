import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {getPaginationItemsNumber, getSortState, IPaginationBaseState, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './counseling-case.reducer';
// tslint:disable-next-line:no-unused-variable
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface ICounselingCaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type ICounselingCaseState = IPaginationBaseState;

export class CounselingCase extends React.Component<ICounselingCaseProps, ICounselingCaseState> {
  state: ICounselingCaseState = {
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
    const {counselingCaseList, match, totalItems} = this.props;
    return (
      <div>
        <h2 id="counseling-case-heading">
          <Translate contentKey="iCounselingApp.counselingCase.home.title">Counseling Cases</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="iCounselingApp.counselingCase.home.createLabel">Create new Counseling
              Case</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={this.sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('status')}>
                <Translate contentKey="iCounselingApp.counselingCase.status">Status</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.counselingCase.visitor">Visitor</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.counselingCase.counselor">Counselor</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {counselingCaseList.map((counselingCase, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${counselingCase.id}`} color="link" size="sm">
                    {counselingCase.id}
                  </Button>
                </td>
                <td>
                  <Translate contentKey={`iCounselingApp.CounselingCaseStatus.${counselingCase.status}`}/>
                </td>
                <td>
                  {counselingCase.visitorId ?
                    <Link to={`visitor/${counselingCase.visitorId}`}>{counselingCase.visitorId}</Link> : ''}
                </td>
                <td>
                  {counselingCase.counselorId ? (
                    <Link to={`counselor/${counselingCase.counselorId}`}>{counselingCase.counselorId}</Link>
                  ) : (
                    ''
                  )}
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${counselingCase.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${counselingCase.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${counselingCase.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({counselingCase}: IRootState) => ({
  counselingCaseList: counselingCase.entities,
  totalItems: counselingCase.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounselingCase);
