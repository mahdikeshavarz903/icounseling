import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { IRate } from 'app/shared/model/rate.model';
import { getEntities as getRates } from 'app/entities/rate/rate.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICommentUpdateState {
  isNew: boolean;
  scheduleId: string;
  rateId: string;
  documentId: string;
  postId: string;
}

export class CommentUpdate extends React.Component<ICommentUpdateProps, ICommentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: '0',
      rateId: '0',
      documentId: '0',
      postId: '0',
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
    this.props.getRates();
    this.props.getDocuments();
    this.props.getPosts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { commentEntity } = this.props;
      const entity = {
        ...commentEntity,
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
    this.props.history.push('/entity/comment');
  };

  render() {
    const { commentEntity, schedules, rates, documents, posts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.comment.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.comment.home.createOrEditLabel">Create or edit a Comment</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : commentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="comment-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="comment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="comment-schedule">
                    <Translate contentKey="iCounselingApp.comment.schedule">Schedule</Translate>
                  </Label>
                  <AvInput id="comment-schedule" type="select" className="form-control" name="scheduleId">
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
                  <Label for="comment-rate">
                    <Translate contentKey="iCounselingApp.comment.rate">Rate</Translate>
                  </Label>
                  <AvInput id="comment-rate" type="select" className="form-control" name="rateId">
                    <option value="" key="0" />
                    {rates
                      ? rates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="comment-post">
                    <Translate contentKey="iCounselingApp.comment.post">Post</Translate>
                  </Label>
                  <AvInput id="comment-post" type="select" className="form-control" name="postId">
                    <option value="" key="0" />
                    {posts
                      ? posts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/comment" replace color="info">
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
  rates: storeState.rate.entities,
  documents: storeState.document.entities,
  posts: storeState.post.entities,
  commentEntity: storeState.comment.entity,
  loading: storeState.comment.loading,
  updating: storeState.comment.updating,
  updateSuccess: storeState.comment.updateSuccess
});

const mapDispatchToProps = {
  getSchedules,
  getRates,
  getDocuments,
  getPosts,
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
)(CommentUpdate);
