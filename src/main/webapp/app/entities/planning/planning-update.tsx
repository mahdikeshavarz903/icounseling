import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getCounselors} from 'app/entities/counselor/counselor.reducer';
import {createEntity, getEntity, reset, updateEntity} from './planning.reducer';
// tslint:disable-next-line:no-unused-variable
import {convertDateTimeFromServer, convertDateTimeToServer} from 'app/shared/util/date-utils';

export interface IPlanningUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IPlanningUpdateState {
  isNew: boolean;
  counselorId: string;
}

export class PlanningUpdate extends React.Component<IPlanningUpdateProps, IPlanningUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getCounselors();
  }

  saveEntity = (event, errors, values) => {
    values.startDateTime = convertDateTimeToServer(values.startDateTime);
    values.endDateTime = convertDateTimeToServer(values.endDateTime);

    if (errors.length === 0) {
      const {planningEntity} = this.props;
      const entity = {
        ...planningEntity,
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
    this.props.history.push('/entity/planning');
  };

  render() {
    const {planningEntity, counselors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.planning.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.planning.home.createOrEditLabel">Create or edit a
                Planning</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : planningEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="planning-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="planning-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="planning-title">
                    <Translate contentKey="iCounselingApp.planning.title">Title</Translate>
                  </Label>
                  <AvField
                    id="planning-title"
                    type="text"
                    name="title"
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateTimeLabel" for="planning-startDateTime">
                    <Translate contentKey="iCounselingApp.planning.startDateTime">Start Date Time</Translate>
                  </Label>
                  <AvInput
                    id="planning-startDateTime"
                    type="datetime-local"
                    className="form-control"
                    name="startDateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.planningEntity.startDateTime)}
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateTimeLabel" for="planning-endDateTime">
                    <Translate contentKey="iCounselingApp.planning.endDateTime">End Date Time</Translate>
                  </Label>
                  <AvInput
                    id="planning-endDateTime"
                    type="datetime-local"
                    className="form-control"
                    name="endDateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.planningEntity.endDateTime)}
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="planning-description">
                    <Translate contentKey="iCounselingApp.planning.description">Description</Translate>
                  </Label>
                  <AvField
                    id="planning-description"
                    type="text"
                    name="description"
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="planning-counselor">
                    <Translate contentKey="iCounselingApp.planning.counselor">Counselor</Translate>
                  </Label>
                  <AvInput id="planning-counselor" type="select" className="form-control" name="counselorId">
                    <option value="" key="0"/>
                    {counselors
                      ? counselors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/planning" replace color="info">
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
  planningEntity: storeState.planning.entity,
  loading: storeState.planning.loading,
  updating: storeState.planning.updating,
  updateSuccess: storeState.planning.updateSuccess
});

const mapDispatchToProps = {
  getCounselors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningUpdate);
