import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './counselor.reducer';
import { ICounselor } from 'app/shared/model/counselor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICounselorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CounselorDetail extends React.Component<ICounselorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { counselorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.counselor.detail.title">Counselor</Translate> [<b>{counselorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="consultantType">
                <Translate contentKey="iCounselingApp.counselor.consultantType">Consultant Type</Translate>
              </span>
            </dt>
            <dd>{counselorEntity.consultantType}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.counselor.education">Education</Translate>
            </dt>
            <dd>{counselorEntity.educationId ? counselorEntity.educationId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.counselor.score">Score</Translate>
            </dt>
            <dd>{counselorEntity.scoreId ? counselorEntity.scoreId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.counselor.user">User</Translate>
            </dt>
            <dd>{counselorEntity.userId ? counselorEntity.userId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/counselor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/counselor/${counselorEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ counselor }: IRootState) => ({
  counselorEntity: counselor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounselorDetail);
