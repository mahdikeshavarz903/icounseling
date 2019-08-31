import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './task.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {taskEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="repeatTime">
                <Translate contentKey="iCounselingApp.task.repeatTime">Repeat Time</Translate>
              </span>
            </dt>
            <dd>{taskEntity.repeatTime}</dd>
            <dt>
              <span id="repeatUntil">
                <Translate contentKey="iCounselingApp.task.repeatUntil">Repeat Until</Translate>
              </span>
            </dt>
            <dd>{taskEntity.repeatUntil}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.task.reminder">Reminder</Translate>
            </dt>
            <dd>{taskEntity.reminderId ? taskEntity.reminderId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.task.schedule">Schedule</Translate>
            </dt>
            <dd>{taskEntity.scheduleId ? taskEntity.scheduleId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.task.planning">Planning</Translate>
            </dt>
            <dd>{taskEntity.planningId ? taskEntity.planningId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/task" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/task/${taskEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({task}: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
