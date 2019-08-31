import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {byteSize, openFile, setFileData, translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getCounselors} from 'app/entities/counselor/counselor.reducer';
import {getEntities as getVisitors} from 'app/entities/visitor/visitor.reducer';
import {createEntity, getEntity, reset, setBlob, updateEntity} from './score.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IScoreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IScoreUpdateState {
  isNew: boolean;
  counselorId: string;
  visitorId: string;
}

export class ScoreUpdate extends React.Component<IScoreUpdateProps, IScoreUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      counselorId: '0',
      visitorId: '0',
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

    this.props.getCounselors();
    this.props.getVisitors();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {scoreEntity} = this.props;
      const entity = {
        ...scoreEntity,
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
    this.props.history.push('/entity/score');
  };

  render() {
    const {scoreEntity, counselors, visitors, loading, updating} = this.props;
    const {isNew} = this.state;

    const {image, imageContentType} = scoreEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.score.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.score.home.createOrEditLabel">Create or edit a Score</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scoreEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="score-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="score-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="totalLabel" for="score-total">
                    <Translate contentKey="iCounselingApp.score.total">Total</Translate>
                  </Label>
                  <AvField
                    id="score-total"
                    type="string"
                    className="form-control"
                    name="total"
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')},
                      number: {value: true, errorMessage: translate('entity.validation.number')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="iCounselingApp.score.image">Image</Translate>
                    </Label>
                    <br/>
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br/>
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle"/>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(false, 'image')}/>
                    <AvInput
                      type="hidden"
                      name="image"
                      value={image}
                      validate={{
                        required: {value: true, errorMessage: translate('entity.validation.required')}
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="degreeLabel" for="score-degree">
                    <Translate contentKey="iCounselingApp.score.degree">Degree</Translate>
                  </Label>
                  <AvInput
                    id="score-degree"
                    type="select"
                    className="form-control"
                    name="degree"
                    value={(!isNew && scoreEntity.degree) || 'PROFESSIONAL'}
                  >
                    <option value="PROFESSIONAL">
                      <Translate contentKey="iCounselingApp.ScoreDegree.PROFESSIONAL"/>
                    </option>
                    <option value="GENERAL">
                      <Translate contentKey="iCounselingApp.ScoreDegree.GENERAL"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/score" replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>
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
  counselors: storeState.counselor.entities,
  visitors: storeState.visitor.entities,
  scoreEntity: storeState.score.entity,
  loading: storeState.score.loading,
  updating: storeState.score.updating,
  updateSuccess: storeState.score.updateSuccess
});

const mapDispatchToProps = {
  getCounselors,
  getVisitors,
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
)(ScoreUpdate);
