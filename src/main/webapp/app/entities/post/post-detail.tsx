import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {byteSize, openFile, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './post.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IPostDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class PostDetail extends React.Component<IPostDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {postEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.post.detail.title">Post</Translate> [<b>{postEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="image">
                <Translate contentKey="iCounselingApp.post.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {postEntity.image ? (
                <div>
                  <a onClick={openFile(postEntity.imageContentType, postEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {postEntity.imageContentType}, {byteSize(postEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="documentFormat">
                <Translate contentKey="iCounselingApp.post.documentFormat">Document Format</Translate>
              </span>
            </dt>
            <dd>{postEntity.documentFormat}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.post.schedule">Schedule</Translate>
            </dt>
            <dd>{postEntity.scheduleId ? postEntity.scheduleId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.post.counselor">Counselor</Translate>
            </dt>
            <dd>{postEntity.counselorId ? postEntity.counselorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/post" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/post/${postEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({post}: IRootState) => ({
  postEntity: post.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
