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
import {createEntity, getEntity, reset, updateEntity} from './time-reserved.reducer';
// tslint:disable-next-line:no-unused-variable
import {convertDateTimeFromServer, convertDateTimeToServer} from 'app/shared/util/date-utils';

export interface ITimeReservedUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface ITimeReservedUpdateState {
  isNew: boolean;
  counselorId: string;
}

export class TimeReservedUpdate extends React.Component<ITimeReservedUpdateProps, ITimeReservedUpdateState> {
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
    values.dateTime = convertDateTimeToServer(values.dateTime);

    if (errors.length === 0) {
      const {timeReservedEntity} = this.props;
      const entity = {
        ...timeReservedEntity,
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
    this.props.history.push('/entity/time-reserved');
  };

  render() {
    const {timeReservedEntity, counselors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.timeReserved.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.timeReserved.home.createOrEditLabel">Create or edit a
                TimeReserved</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : timeReservedEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="time-reserved-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="time-reserved-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateTimeLabel" for="time-reserved-dateTime">
                    <Translate contentKey="iCounselingApp.timeReserved.dateTime">Date Time</Translate>
                  </Label>
                  <AvInput
                    id="time-reserved-dateTime"
                    type="datetime-local"
                    className="form-control"
                    name="dateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.timeReservedEntity.dateTime)}
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="time-reserved-description">
                    <Translate contentKey="iCounselingApp.timeReserved.description">Description</Translate>
                  </Label>
                  <AvField
                    id="time-reserved-description"
                    type="text"
                    name="description"
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="time-reserved-counselor">
                    <Translate contentKey="iCounselingApp.timeReserved.counselor">Counselor</Translate>
                  </Label>
                  <AvInput id="time-reserved-counselor" type="select" className="form-control" name="counselorId">
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
                <Button tag={Link} id="cancel-save" to="/entity/time-reserved" replace color="info">
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
  timeReservedEntity: storeState.timeReserved.entity,
  loading: storeState.timeReserved.loading,
  updating: storeState.timeReserved.updating,
  updateSuccess: storeState.timeReserved.updateSuccess
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
)(TimeReservedUpdate);
