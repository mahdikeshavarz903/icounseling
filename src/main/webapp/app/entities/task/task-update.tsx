import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getReminders} from 'app/entities/reminder/reminder.reducer';
import {getEntities as getSchedules} from 'app/entities/schedule/schedule.reducer';
import {getEntities as getPlannings} from 'app/entities/planning/planning.reducer';
import {createEntity, getEntity, reset, updateEntity} from './task.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface ITaskUpdateState {
  isNew: boolean;
  reminderId: string;
  scheduleId: string;
  planningId: string;
}

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      reminderId: '0',
      scheduleId: '0',
      planningId: '0',
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

    this.props.getReminders();
    this.props.getSchedules();
    this.props.getPlannings();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {taskEntity} = this.props;
      const entity = {
        ...taskEntity,
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
    this.props.history.push('/entity/task');
  };

  render() {
    const {taskEntity, reminders, schedules, plannings, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.task.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taskEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="task-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="repeatTimeLabel" for="task-repeatTime">
                    <Translate contentKey="iCounselingApp.task.repeatTime">Repeat Time</Translate>
                  </Label>
                  <AvInput
                    id="task-repeatTime"
                    type="select"
                    className="form-control"
                    name="repeatTime"
                    value={(!isNew && taskEntity.repeatTime) || 'NONE'}
                  >
                    <option value="NONE">
                      <Translate contentKey="iCounselingApp.RepeatTime.NONE"/>
                    </option>
                    <option value="DAILY">
                      <Translate contentKey="iCounselingApp.RepeatTime.DAILY"/>
                    </option>
                    <option value="WEEKLY">
                      <Translate contentKey="iCounselingApp.RepeatTime.WEEKLY"/>
                    </option>
                    <option value="MONTHLY">
                      <Translate contentKey="iCounselingApp.RepeatTime.MONTHLY"/>
                    </option>
                    <option value="YEARLY">
                      <Translate contentKey="iCounselingApp.RepeatTime.YEARLY"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="repeatUntilLabel" for="task-repeatUntil">
                    <Translate contentKey="iCounselingApp.task.repeatUntil">Repeat Until</Translate>
                  </Label>
                  <AvInput
                    id="task-repeatUntil"
                    type="select"
                    className="form-control"
                    name="repeatUntil"
                    value={(!isNew && taskEntity.repeatUntil) || 'NO_END_DATE'}
                  >
                    <option value="NO_END_DATE">
                      <Translate contentKey="iCounselingApp.RepeatUntil.NO_END_DATE"/>
                    </option>
                    <option value="SET_END_DATE">
                      <Translate contentKey="iCounselingApp.RepeatUntil.SET_END_DATE"/>
                    </option>
                    <option value="SET_NUMBER_OF_TIMES">
                      <Translate contentKey="iCounselingApp.RepeatUntil.SET_NUMBER_OF_TIMES"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="task-reminder">
                    <Translate contentKey="iCounselingApp.task.reminder">Reminder</Translate>
                  </Label>
                  <AvInput id="task-reminder" type="select" className="form-control" name="reminderId">
                    <option value="" key="0"/>
                    {reminders
                      ? reminders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="task-schedule">
                    <Translate contentKey="iCounselingApp.task.schedule">Schedule</Translate>
                  </Label>
                  <AvInput id="task-schedule" type="select" className="form-control" name="scheduleId">
                    <option value="" key="0"/>
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
                  <Label for="task-planning">
                    <Translate contentKey="iCounselingApp.task.planning">Planning</Translate>
                  </Label>
                  <AvInput id="task-planning" type="select" className="form-control" name="planningId">
                    <option value="" key="0"/>
                    {plannings
                      ? plannings.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/task" replace color="info">
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
  reminders: storeState.reminder.entities,
  schedules: storeState.schedule.entities,
  plannings: storeState.planning.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getReminders,
  getSchedules,
  getPlannings,
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
)(TaskUpdate);
