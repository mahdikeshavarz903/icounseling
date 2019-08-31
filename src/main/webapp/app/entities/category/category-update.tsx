import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILibrary } from 'app/shared/model/library.model';
import { getEntities as getLibraries } from 'app/entities/library/library.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICategoryUpdateState {
  isNew: boolean;
  libraryId: string;
}

export class CategoryUpdate extends React.Component<ICategoryUpdateProps, ICategoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      libraryId: '0',
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

    this.props.getLibraries();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { categoryEntity } = this.props;
      const entity = {
        ...categoryEntity,
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
    this.props.history.push('/entity/category');
  };

  render() {
    const { categoryEntity, libraries, loading, updating } = this.props;
    const { isNew } = this.state;

    const { images, imagesContentType } = categoryEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.category.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.category.home.createOrEditLabel">Create or edit a Category</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : categoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="category-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="category-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <AvGroup>
                    <Label id="imagesLabel" for="images">
                      <Translate contentKey="iCounselingApp.category.images">Images</Translate>
                    </Label>
                    <br />
                    {images ? (
                      <div>
                        <a onClick={openFile(imagesContentType, images)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imagesContentType}, {byteSize(images)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('images')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_images" type="file" onChange={this.onBlobChange(false, 'images')} />
                    <AvInput type="hidden" name="images" value={images} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="categoryTypeLabel" for="category-categoryType">
                    <Translate contentKey="iCounselingApp.category.categoryType">Category Type</Translate>
                  </Label>
                  <AvInput
                    id="category-categoryType"
                    type="select"
                    className="form-control"
                    name="categoryType"
                    value={(!isNew && categoryEntity.categoryType) || 'ROMANCE'}
                  >
                    <option value="ROMANCE">
                      <Translate contentKey="iCounselingApp.CategoryType.ROMANCE" />
                    </option>
                    <option value="ARTS_PHOTOGRAPHY">
                      <Translate contentKey="iCounselingApp.CategoryType.ARTS_PHOTOGRAPHY" />
                    </option>
                    <option value="BIOGRAPHIES_MEMOIRS">
                      <Translate contentKey="iCounselingApp.CategoryType.BIOGRAPHIES_MEMOIRS" />
                    </option>
                    <option value="BUSINESS_INVESTING">
                      <Translate contentKey="iCounselingApp.CategoryType.BUSINESS_INVESTING" />
                    </option>
                    <option value="CHILDREN_BOOKS">
                      <Translate contentKey="iCounselingApp.CategoryType.CHILDREN_BOOKS" />
                    </option>
                    <option value="COOKBOOKS_FOOD">
                      <Translate contentKey="iCounselingApp.CategoryType.COOKBOOKS_FOOD" />
                    </option>
                    <option value="HISTORY">
                      <Translate contentKey="iCounselingApp.CategoryType.HISTORY" />
                    </option>
                    <option value="LOTERATURE_FICTION">
                      <Translate contentKey="iCounselingApp.CategoryType.LOTERATURE_FICTION" />
                    </option>
                    <option value="MYSTERY_THRILLER_SUSPENSE">
                      <Translate contentKey="iCounselingApp.CategoryType.MYSTERY_THRILLER_SUSPENSE" />
                    </option>
                    <option value="SCIENCE_FICTION_FANTASY">
                      <Translate contentKey="iCounselingApp.CategoryType.SCIENCE_FICTION_FANTASY" />
                    </option>
                    <option value="TEEN_YOUNG_ADULT_BOOKS">
                      <Translate contentKey="iCounselingApp.CategoryType.TEEN_YOUNG_ADULT_BOOKS" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="category-library">
                    <Translate contentKey="iCounselingApp.category.library">Library</Translate>
                  </Label>
                  <AvInput id="category-library" type="select" className="form-control" name="libraryId">
                    <option value="" key="0" />
                    {libraries
                      ? libraries.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/category" replace color="info">
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
  libraries: storeState.library.entities,
  categoryEntity: storeState.category.entity,
  loading: storeState.category.loading,
  updating: storeState.category.updating,
  updateSuccess: storeState.category.updateSuccess
});

const mapDispatchToProps = {
  getLibraries,
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
)(CategoryUpdate);
