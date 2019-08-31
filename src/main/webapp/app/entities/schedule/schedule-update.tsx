import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IScheduleUpdateState {
  isNew: boolean;
  taskId: string;
  postId: string;
  commentId: string;
}

export class ScheduleUpdate extends React.Component<IScheduleUpdateProps, IScheduleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      taskId: '0',
      postId: '0',
      commentId: '0',
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

    this.props.getTasks();
    this.props.getPosts();
    this.props.getComments();
  }

  saveEntity = (event, errors, values) => {
    values.dateTime = convertDateTimeToServer(values.dateTime);

    if (errors.length === 0) {
      const { scheduleEntity } = this.props;
      const entity = {
        ...scheduleEntity,
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
    this.props.history.push('/entity/schedule');
  };

  render() {
    const { scheduleEntity, tasks, posts, comments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.schedule.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.schedule.home.createOrEditLabel">Create or edit a Schedule</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scheduleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="schedule-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="schedule-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="schedule-title">
                    <Translate contentKey="iCounselingApp.schedule.title">Title</Translate>
                  </Label>
                  <AvField
                    id="schedule-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateTimeLabel" for="schedule-dateTime">
                    <Translate contentKey="iCounselingApp.schedule.dateTime">Date Time</Translate>
                  </Label>
                  <AvInput
                    id="schedule-dateTime"
                    type="datetime-local"
                    className="form-control"
                    name="dateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.scheduleEntity.dateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="schedule-description">
                    <Translate contentKey="iCounselingApp.schedule.description">Description</Translate>
                  </Label>
                  <AvField
                    id="schedule-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/schedule" replace color="info">
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
  tasks: storeState.task.entities,
  posts: storeState.post.entities,
  comments: storeState.comment.entities,
  scheduleEntity: storeState.schedule.entity,
  loading: storeState.schedule.loading,
  updating: storeState.schedule.updating,
  updateSuccess: storeState.schedule.updateSuccess
});

const mapDispatchToProps = {
  getTasks,
  getPosts,
  getComments,
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
)(ScheduleUpdate);
