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
import {getEntities} from './library.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface ILibraryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type ILibraryState = IPaginationBaseState;

export class Library extends React.Component<ILibraryProps, ILibraryState> {
  state: ILibraryState = {
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
    const {libraryList, match, totalItems} = this.props;
    return (
      <div>
        <h2 id="library-heading">
          <Translate contentKey="iCounselingApp.library.home.title">Libraries</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="iCounselingApp.library.home.createLabel">Create new Library</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={this.sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('name')}>
                <Translate contentKey="iCounselingApp.library.name">Name</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('creationTime')}>
                <Translate contentKey="iCounselingApp.library.creationTime">Creation Time</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.library.visitor">Visitor</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {libraryList.map((library, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${library.id}`} color="link" size="sm">
                    {library.id}
                  </Button>
                </td>
                <td>{library.name}</td>
                <td>
                  <TextFormat type="date" value={library.creationTime} format={APP_LOCAL_DATE_FORMAT}/>
                </td>
                <td>{library.visitorId ? <Link to={`visitor/${library.visitorId}`}>{library.visitorId}</Link> : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${library.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${library.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${library.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({library}: IRootState) => ({
  libraryList: library.entities,
  totalItems: library.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
