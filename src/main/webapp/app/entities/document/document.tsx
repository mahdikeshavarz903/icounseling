import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  byteSize,
  getPaginationItemsNumber,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  openFile,
  TextFormat,
  Translate
} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './document.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type IDocumentState = IPaginationBaseState;

export class Document extends React.Component<IDocumentProps, IDocumentState> {
  state: IDocumentState = {
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
    const {documentList, match, totalItems} = this.props;
    return (
      <div>
        <h2 id="document-heading">
          <Translate contentKey="iCounselingApp.document.home.title">Documents</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="iCounselingApp.document.home.createLabel">Create new Document</Translate>
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
                <Translate contentKey="iCounselingApp.document.title">Title</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('description')}>
                <Translate contentKey="iCounselingApp.document.description">Description</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('price')}>
                <Translate contentKey="iCounselingApp.document.price">Price</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('publishedDate')}>
                <Translate contentKey="iCounselingApp.document.publishedDate">Published Date</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('paymentType')}>
                <Translate contentKey="iCounselingApp.document.paymentType">Payment Type</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('documentFormat')}>
                <Translate contentKey="iCounselingApp.document.documentFormat">Document Format</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('imagesGallery')}>
                <Translate contentKey="iCounselingApp.document.imagesGallery">Images Gallery</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={this.sort('tag')}>
                <Translate contentKey="iCounselingApp.document.tag">Tag</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.document.rate">Rate</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.document.comment">Comment</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.document.gategory">Gategory</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="iCounselingApp.document.counselor">Counselor</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {documentList.map((document, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                    {document.id}
                  </Button>
                </td>
                <td>{document.title}</td>
                <td>
                  {document.description ? (
                    <div>
                      <a onClick={openFile(document.descriptionContentType, document.description)}>
                        <Translate contentKey="entity.action.open">Open</Translate>
                        &nbsp;
                      </a>
                      <span>
                          {document.descriptionContentType}, {byteSize(document.description)}
                        </span>
                    </div>
                  ) : null}
                </td>
                <td>{document.price}</td>
                <td>
                  <TextFormat type="date" value={document.publishedDate} format={APP_LOCAL_DATE_FORMAT}/>
                </td>
                <td>
                  <Translate contentKey={`iCounselingApp.PaymentType.${document.paymentType}`}/>
                </td>
                <td>
                  <Translate contentKey={`iCounselingApp.DocumentFormat.${document.documentFormat}`}/>
                </td>
                <td>
                  {document.imagesGallery ? (
                    <div>
                      <a onClick={openFile(document.imagesGalleryContentType, document.imagesGallery)}>
                        <Translate contentKey="entity.action.open">Open</Translate>
                        &nbsp;
                      </a>
                      <span>
                          {document.imagesGalleryContentType}, {byteSize(document.imagesGallery)}
                        </span>
                    </div>
                  ) : null}
                </td>
                <td>{document.tag}</td>
                <td>{document.rateIndex ? <Link to={`rate/${document.rateId}`}>{document.rateIndex}</Link> : ''}</td>
                <td>{document.commentId ?
                  <Link to={`comment/${document.commentId}`}>{document.commentId}</Link> : ''}</td>
                <td>
                  {document.gategoryCategoryType ? (
                    <Link to={`category/${document.gategoryId}`}>{document.gategoryCategoryType}</Link>
                  ) : (
                    ''
                  )}
                </td>
                <td>{document.counselorId ?
                  <Link to={`counselor/${document.counselorId}`}>{document.counselorId}</Link> : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${document.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${document.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${document.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({document}: IRootState) => ({
  documentList: document.entities,
  totalItems: document.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Document);
