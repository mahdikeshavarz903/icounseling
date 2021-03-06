import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { ICounselor } from 'app/shared/model/counselor.model';
import { getEntities as getCounselors } from 'app/entities/counselor/counselor.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPostUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPostUpdateState {
  isNew: boolean;
  scheduleId: string;
  counselorId: string;
}

export class PostUpdate extends React.Component<IPostUpdateProps, IPostUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: '0',
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

    this.props.getSchedules();
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
      const { postEntity } = this.props;
      const entity = {
        ...postEntity,
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
    this.props.history.push('/entity/post');
  };

  render() {
    const { postEntity, schedules, counselors, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = postEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.post.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : postEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="post-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="post-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="iCounselingApp.post.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(false, 'image')} />
                    <AvInput
                      type="hidden"
                      name="image"
                      value={image}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="likeNumbersLabel" for="post-likeNumbers">
                    <Translate contentKey="iCounselingApp.post.likeNumbers">Like Numbers</Translate>
                  </Label>
                  <AvField
                    id="post-likeNumbers"
                    type="string"
                    className="form-control"
                    name="likeNumbers"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfViewsLabel" for="post-numberOfViews">
                    <Translate contentKey="iCounselingApp.post.numberOfViews">Number Of Views</Translate>
                  </Label>
                  <AvField
                    id="post-numberOfViews"
                    type="string"
                    className="form-control"
                    name="numberOfViews"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="documentFormatLabel" for="post-documentFormat">
                    <Translate contentKey="iCounselingApp.post.documentFormat">Document Format</Translate>
                  </Label>
                  <AvInput
                    id="post-documentFormat"
                    type="select"
                    className="form-control"
                    name="documentFormat"
                    value={(!isNew && postEntity.documentFormat) || 'PDF'}
                  >
                    <option value="PDF">{translate('iCounselingApp.DocumentFormat.PDF')}</option>
                    <option value="DOCX">{translate('iCounselingApp.DocumentFormat.DOCX')}</option>
                    <option value="DOC">{translate('iCounselingApp.DocumentFormat.DOC')}</option>
                    <option value="XLSX">{translate('iCounselingApp.DocumentFormat.XLSX')}</option>
                    <option value="PPT">{translate('iCounselingApp.DocumentFormat.PPT')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="post-schedule">
                    <Translate contentKey="iCounselingApp.post.schedule">Schedule</Translate>
                  </Label>
                  <AvInput id="post-schedule" type="select" className="form-control" name="scheduleId">
                    <option value="" key="0" />
                    {schedules
                      ? schedules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="post-counselor">
                    <Translate contentKey="iCounselingApp.post.counselor">Counselor</Translate>
                  </Label>
                  <AvInput id="post-counselor" type="select" className="form-control" name="counselorId">
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
                <Button tag={Link} id="cancel-save" to="/entity/post" replace color="info">
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
  schedules: storeState.schedule.entities,
  counselors: storeState.counselor.entities,
  postEntity: storeState.post.entity,
  loading: storeState.post.loading,
  updating: storeState.post.updating,
  updateSuccess: storeState.post.updateSuccess
});

const mapDispatchToProps = {
  getSchedules,
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
)(PostUpdate);
