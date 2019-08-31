import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {byteSize, openFile, TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './document.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_LOCAL_DATE_FORMAT} from 'app/config/constants';

export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class DocumentDetail extends React.Component<IDocumentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {documentEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.document.detail.title">Document</Translate> [<b>{documentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="iCounselingApp.document.title">Title</Translate>
              </span>
            </dt>
            <dd>{documentEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="iCounselingApp.document.description">Description</Translate>
              </span>
            </dt>
            <dd>
              {documentEntity.description ? (
                <div>
                  <a onClick={openFile(documentEntity.descriptionContentType, documentEntity.description)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {documentEntity.descriptionContentType}, {byteSize(documentEntity.description)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="price">
                <Translate contentKey="iCounselingApp.document.price">Price</Translate>
              </span>
            </dt>
            <dd>{documentEntity.price}</dd>
            <dt>
              <span id="publishedDate">
                <Translate contentKey="iCounselingApp.document.publishedDate">Published Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={documentEntity.publishedDate} type="date" format={APP_LOCAL_DATE_FORMAT}/>
            </dd>
            <dt>
              <span id="paymentType">
                <Translate contentKey="iCounselingApp.document.paymentType">Payment Type</Translate>
              </span>
            </dt>
            <dd>{documentEntity.paymentType}</dd>
            <dt>
              <span id="documentFormat">
                <Translate contentKey="iCounselingApp.document.documentFormat">Document Format</Translate>
              </span>
            </dt>
            <dd>{documentEntity.documentFormat}</dd>
            <dt>
              <span id="imagesGallery">
                <Translate contentKey="iCounselingApp.document.imagesGallery">Images Gallery</Translate>
              </span>
            </dt>
            <dd>
              {documentEntity.imagesGallery ? (
                <div>
                  <a onClick={openFile(documentEntity.imagesGalleryContentType, documentEntity.imagesGallery)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {documentEntity.imagesGalleryContentType}, {byteSize(documentEntity.imagesGallery)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="tag">
                <Translate contentKey="iCounselingApp.document.tag">Tag</Translate>
              </span>
            </dt>
            <dd>{documentEntity.tag}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.document.rate">Rate</Translate>
            </dt>
            <dd>{documentEntity.rateIndex ? documentEntity.rateIndex : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.document.comment">Comment</Translate>
            </dt>
            <dd>{documentEntity.commentId ? documentEntity.commentId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.document.gategory">Gategory</Translate>
            </dt>
            <dd>{documentEntity.gategoryCategoryType ? documentEntity.gategoryCategoryType : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.document.counselor">Counselor</Translate>
            </dt>
            <dd>{documentEntity.counselorId ? documentEntity.counselorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/document" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/document/${documentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({document}: IRootState) => ({
  documentEntity: document.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetail);
