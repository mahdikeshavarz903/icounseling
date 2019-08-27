import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './visitor.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IVisitorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class VisitorDetail extends React.Component<IVisitorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {visitorEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.visitor.detail.title">Visitor</Translate> [<b>{visitorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="iCounselingApp.visitor.score">Score</Translate>
            </dt>
            <dd>{visitorEntity.scoreId ? visitorEntity.scoreId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.visitor.education">Education</Translate>
            </dt>
            <dd>{visitorEntity.educationId ? visitorEntity.educationId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.visitor.user">User</Translate>
            </dt>
            <dd>{visitorEntity.userId ? visitorEntity.userId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/visitor" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/visitor/${visitorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({visitor}: IRootState) => ({
  visitorEntity: visitor.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitorDetail);
