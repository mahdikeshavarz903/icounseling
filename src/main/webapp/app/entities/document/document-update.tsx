import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRate } from 'app/shared/model/rate.model';
import { getEntities as getRates } from 'app/entities/rate/rate.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ICounselor } from 'app/shared/model/counselor.model';
import { getEntities as getCounselors } from 'app/entities/counselor/counselor.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDocumentUpdateState {
  isNew: boolean;
  rateId: string;
  commentId: string;
  gategoryId: string;
  counselorId: string;
}

export class DocumentUpdate extends React.Component<IDocumentUpdateProps, IDocumentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      rateId: '0',
      commentId: '0',
      gategoryId: '0',
      counselorId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRates();
    this.props.getComments();
    this.props.getCategories();
    this.props.getCounselors();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { documentEntity } = this.props;
      const entity = {
        ...documentEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/document');
  };

  render() {
    const { documentEntity, rates, comments, categories, counselors, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description, descriptionContentType, imagesGallery, imagesGalleryContentType } = documentEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.document.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.document.home.createOrEditLabel">Create or edit a Document</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : documentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="document-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="document-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="document-title">
                    <Translate contentKey="iCounselingApp.document.title">Title</Translate>
                  </Label>
                  <AvField
                    id="document-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="descriptionLabel" for="description">
                      <Translate contentKey="iCounselingApp.document.description">Description</Translate>
                    </Label>
                    <br />
                    {description ? (
                      <div>
                        <a onClick={openFile(descriptionContentType, description)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {descriptionContentType}, {byteSize(description)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('description')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_description" type="file" onChange={this.onBlobChange(false, 'description')} />
                    <AvInput
                      type="hidden"
                      name="description"
                      value={description}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="document-price">
                    <Translate contentKey="iCounselingApp.document.price">Price</Translate>
                  </Label>
                  <AvField
                    id="document-price"
                    type="string"
                    className="form-control"
                    name="price"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="publishedDateLabel" for="document-publishedDate">
                    <Translate contentKey="iCounselingApp.document.publishedDate">Published Date</Translate>
                  </Label>
                  <AvField id="document-publishedDate" type="date" className="form-control" name="publishedDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentTypeLabel" for="document-paymentType">
                    <Translate contentKey="iCounselingApp.document.paymentType">Payment Type</Translate>
                  </Label>
                  <AvInput
                    id="document-paymentType"
                    type="select"
                    className="form-control"
                    name="paymentType"
                    value={(!isNew && documentEntity.paymentType) || 'FREE'}
                  >
                    <option value="FREE">
                      <Translate contentKey="iCounselingApp.PaymentType.FREE" />
                    </option>
                    <option value="PAID">
                      <Translate contentKey="iCounselingApp.PaymentType.PAID" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="documentFormatLabel" for="document-documentFormat">
                    <Translate contentKey="iCounselingApp.document.documentFormat">Document Format</Translate>
                  </Label>
                  <AvInput
                    id="document-documentFormat"
                    type="select"
                    className="form-control"
                    name="documentFormat"
                    value={(!isNew && documentEntity.documentFormat) || 'PDF'}
                  >
                    <option value="PDF">
                      <Translate contentKey="iCounselingApp.DocumentFormat.PDF" />
                    </option>
                    <option value="DOCX">
                      <Translate contentKey="iCounselingApp.DocumentFormat.DOCX" />
                    </option>
                    <option value="DOC">
                      <Translate contentKey="iCounselingApp.DocumentFormat.DOC" />
                    </option>
                    <option value="XLSX">
                      <Translate contentKey="iCounselingApp.DocumentFormat.XLSX" />
                    </option>
                    <option value="PPT">
                      <Translate contentKey="iCounselingApp.DocumentFormat.PPT" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imagesGalleryLabel" for="imagesGallery">
                      <Translate contentKey="iCounselingApp.document.imagesGallery">Images Gallery</Translate>
                    </Label>
                    <br />
                    {imagesGallery ? (
                      <div>
                        <a onClick={openFile(imagesGalleryContentType, imagesGallery)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imagesGalleryContentType}, {byteSize(imagesGallery)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('imagesGallery')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_imagesGallery" type="file" onChange={this.onBlobChange(false, 'imagesGallery')} />
                    <AvInput
                      type="hidden"
                      name="imagesGallery"
                      value={imagesGallery}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="tagLabel" for="document-tag">
                    <Translate contentKey="iCounselingApp.document.tag">Tag</Translate>
                  </Label>
                  <AvField
                    id="document-tag"
                    type="text"
                    name="tag"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="document-rate">
                    <Translate contentKey="iCounselingApp.document.rate">Rate</Translate>
                  </Label>
                  <AvInput id="document-rate" type="select" className="form-control" name="rateId">
                    <option value="" key="0" />
                    {rates
                      ? rates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.index}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="document-comment">
                    <Translate contentKey="iCounselingApp.document.comment">Comment</Translate>
                  </Label>
                  <AvInput id="document-comment" type="select" className="form-control" name="commentId">
                    <option value="" key="0" />
                    {comments
                      ? comments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="document-gategory">
                    <Translate contentKey="iCounselingApp.document.gategory">Gategory</Translate>
                  </Label>
                  <AvInput id="document-gategory" type="select" className="form-control" name="gategoryId">
                    <option value="" key="0" />
                    {categories
                      ? categories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.categoryType}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="document-counselor">
                    <Translate contentKey="iCounselingApp.document.counselor">Counselor</Translate>
                  </Label>
                  <AvInput id="document-counselor" type="select" className="form-control" name="counselorId">
                    <option value="" key="0" />
                    {counselors
                      ? counselors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/document" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  rates: storeState.rate.entities,
  comments: storeState.comment.entities,
  categories: storeState.category.entities,
  counselors: storeState.counselor.entities,
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating,
  updateSuccess: storeState.document.updateSuccess
});

const mapDispatchToProps = {
  getRates,
  getComments,
  getCategories,
  getCounselors,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentUpdate);
